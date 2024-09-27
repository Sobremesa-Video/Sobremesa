package main

import (
	"bytes"
	"github.com/goombaio/namegenerator"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

func serveWebSocket(w http.ResponseWriter, r *http.Request, hub *ConnectionHub) {
	wsConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	chatConn := &Connection{hub: hub, webConn: wsConn, name: hub.generateName(), out: make(chan []byte, 256)}

	hub.newConn <- chatConn

	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go chatConn.readRoutine()
	go chatConn.writeRoutine()
}

func main() {
	hub := ConnectionHub{
		connections: make(map[string]*Connection),
		newConn:     make(chan *Connection),
		destroyConn: make(chan *Connection),
		broadcast:   make(chan []byte),
	}

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWebSocket(w, r, &hub)
	})
	err := http.ListenAndServe("localhost:8080", nil)

	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}

}

type Connection struct {
	hub *ConnectionHub

	name    string
	webConn *websocket.Conn
	out     chan []byte
}

func (connection *Connection) readRoutine() {
	defer func() {
		_ = connection.webConn.Close()
		connection.hub.destroyConn <- connection
	}()

	connection.webConn.SetReadLimit(maxMessageSize)
	_ = connection.webConn.SetReadDeadline(time.Now().Add(pongWait))
	connection.webConn.SetPongHandler(func(string) error { _ = connection.webConn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := connection.webConn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		connection.hub.broadcast <- message
	}
}

func (connection *Connection) writeRoutine() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		_ = connection.webConn.Close()
	}()

	for {
		select {
		case message, ok := <-connection.out:
			_ = connection.webConn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				_ = connection.webConn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := connection.webConn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			_, _ = w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(connection.out)
			for i := 0; i < n; i++ {
				_, _ = w.Write(newline)
				_, _ = w.Write(<-connection.out)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			_ = connection.webConn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := connection.webConn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

type ConnectionHub struct {
	connections map[string]*Connection

	newConn     chan *Connection
	destroyConn chan *Connection
	broadcast   chan []byte
}

func (hub *ConnectionHub) routine() {
	for {
		select {
		case conn := <-hub.newConn:
			hub.connections[conn.name] = conn
		case conn := <-hub.destroyConn:
			if _, ok := hub.connections[conn.name]; ok {
				delete(hub.connections, conn.name)
				close(conn.out)
			}
		case message := <-hub.broadcast:
			for _, conn := range hub.connections {
				select {
				case conn.out <- message:
				default:
					close(conn.out)
					delete(hub.connections, conn.name)
				}
			}
		}
	}

}

func (hub *ConnectionHub) generateName() string {
	seed := time.Now().UTC().UnixNano()
	nameGenerator := namegenerator.NewNameGenerator(seed)

	for {
		name := nameGenerator.Generate()
		if !hub.doesNameExist(name) {
			return name
		}
	}
}

func (hub *ConnectionHub) doesNameExist(name string) bool {
	_, ok := hub.connections[name]
	return ok
}

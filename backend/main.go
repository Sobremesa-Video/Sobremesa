package main

import (
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
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
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

func main() {
	hub := ConnectionHub{
		connections: make(map[string]*Connection),
		newConn:     make(chan *Connection),
		destroyConn: make(chan *Connection),
		broadcast:   make(chan []byte),
	}

	go func() {
		http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
			serveWebSocket(w, r, &hub)
		})

		print("Server online")
		err := http.ListenAndServe("localhost:8080", nil)
		if err != nil {
			log.Fatal("ListenAndServe: ", err)
		}
	}()

	hub.routine()
}

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

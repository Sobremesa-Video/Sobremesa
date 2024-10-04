package chat

import (
	"github.com/goombaio/namegenerator"
	"github.com/gorilla/websocket"
	"time"
)

type ConnectionHub struct {
	connections map[string]*Connection

	newConn     chan *Connection
	destroyConn chan *Connection
	broadcast   chan []byte
}

func (hub *ConnectionHub) Routine() {
	for {
		select {
		case conn := <-hub.newConn:
			hub.connections[conn.name] = conn
			conn.out <- conn.marshalData(NAME_DATA)
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

func NewHub() *ConnectionHub {
	return &ConnectionHub{
		connections: make(map[string]*Connection),
		newConn:     make(chan *Connection),
		destroyConn: make(chan *Connection),
		broadcast:   make(chan []byte),
	}
}

func (hub *ConnectionHub) NewConn(ws *websocket.Conn) *Connection {
	c := &Connection{
		name:    hub.generateName(),
		out:     make(chan []byte),
		hub:     hub,
		webConn: ws,
	}

	hub.newConn <- c
	return c
}

package chat

import (
	"bytes"
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"time"
)

type Connection struct {
	hub *ConnectionHub

	name    string
	webConn *websocket.Conn
	out     chan []byte
}

func (connection *Connection) ReadRoutine() {
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
		connection.hub.broadcast <- connection.formatMessage(message)
	}
}

func (connection *Connection) WriteRoutine() {
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

func (connection *Connection) formatMessage(message []byte) []byte {
	return append([]byte(connection.name+": "), message...)
}

// this is so unbelievably insecure. TODO once we've actually got accounts, revamp or eliminate this.
func (connection *Connection) marshalData(dataType DataType) []byte {

	data, _ := json.Marshal(SysData{DataType: NAME_DATA, Data: connection.name})
	return data
}

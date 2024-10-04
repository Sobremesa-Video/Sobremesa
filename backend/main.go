package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"watchparty/video"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	testSession := video.NewSession()

	go func() {
		http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
			serveWebSocket(w, r, &testSession)
		})

		print("Server online")
		err := http.ListenAndServe("localhost:8080", nil)
		if err != nil {
			log.Fatal("ListenAndServe: ", err)
		}
	}()

	testSession.Run()
}

func serveWebSocket(w http.ResponseWriter, r *http.Request, s *video.Session) {
	wsConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	chatConn := s.Hub.NewConn(wsConn)

	go chatConn.ReadRoutine()
	go chatConn.WriteRoutine()
}

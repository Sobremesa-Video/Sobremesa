package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"watchparty/database"
	"watchparty/spine"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	client := database.GetSQLiteClient()

	// variable for Execute call
	createTableStmt := ` 
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		full_name TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL,
		pass TEXT NOT NULL
	);`

	err := client.Execute(createTableStmt)
	if err != nil {
		log.Fatalf("Failed to create table: %v", err)
	} else {
		fmt.Println("Table created successfully.")
	}

	sessionHub := spine.NewSessionHub()

	go func() {
		// TODO eventually probably switch to a servemux

		http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
			serveWebSocket(w, r, sessionHub)
		})

		http.HandleFunc("/ws/", func(w http.ResponseWriter, r *http.Request) {
			serveWebSocket(w, r, sessionHub)
		})

		http.HandleFunc("/newSession", func(w http.ResponseWriter, r *http.Request) {
			createNewSession(w, r, sessionHub)
		})

		fmt.Println("Server online")
		err := http.ListenAndServe("localhost:8080", nil)
		if err != nil {
			log.Fatal("ListenAndServe: ", err)
		}
	}()

	sessionHub.Run()

}

func serveWebSocket(w http.ResponseWriter, r *http.Request, h *spine.SessionHub) {
	wsConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	var id int
	pathElements := strings.Split(r.URL.Path, "/")
	if len(pathElements) < 3 {
		id = 0
	} else {
		id, _ = strconv.Atoi(pathElements[2])
	}

	session, err := h.GetSession(id)

	if err != nil {
		log.Println(err)
		_ = wsConn.WriteMessage(websocket.TextMessage, []byte(err.Error()))
		_ = wsConn.Close()
		return
	}

	if session != nil {
		chatConn := session.Hub.NewConn(wsConn)

		go chatConn.ReadRoutine()
		go chatConn.WriteRoutine()
	}
}

func createNewSession(w http.ResponseWriter, r *http.Request, h *spine.SessionHub) {
	session := h.NewSession(r.Header.Get("Session-Name"))

	_, _ = w.Write([]byte(fmt.Sprint(session.ID)))
}

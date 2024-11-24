package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"io"
	"log"
	"net/http"
	"strconv"
	"strings"
	"watchparty/spine"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	sessionHub := spine.NewSessionHub()

	go func() {
		// TODO eventually probably switch to a servemux

		//http.HandleFunc("/", handleWithCORS(ping, true))

		http.HandleFunc("/ws", handleWithCORS(func(w http.ResponseWriter, r *http.Request) {
			serveWebSocket(w, r, sessionHub)
		}, false))

		http.HandleFunc("/ws/", handleWithCORS(func(w http.ResponseWriter, r *http.Request) {
			serveWebSocket(w, r, sessionHub)
		}, false))

		http.HandleFunc("/newSession", handleWithCORS(func(w http.ResponseWriter, r *http.Request) {
			createNewSession(w, r, sessionHub)
		}, false))

		http.HandleFunc("/getStream/", handleWithCORS(func(w http.ResponseWriter, r *http.Request) {
			getStream(w, r, sessionHub)
		}, false))

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

func getStream(w http.ResponseWriter, r *http.Request, h *spine.SessionHub) {
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
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	bodyString := string(body)

	offer := session.Stream.CreateClientConnection(bodyString)

	_, err = w.Write([]byte(offer)) // Send the offer to the client

	print("Offer is " + offer)
	if err != nil {
		return
	}
}

func ping(w http.ResponseWriter, r *http.Request) {
	_, err := w.Write([]byte("pong"))
	if err != nil {
		return
	}
}

func handleWithCORS(handler http.HandlerFunc, okCode bool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Expose-Headers", "*")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if okCode {
			w.WriteHeader(200)
		}
		handler(w, r)
	}
}

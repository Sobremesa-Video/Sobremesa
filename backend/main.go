package main

import (
	"encoding/json"
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

		http.HandleFunc("/signup", handleSignup)

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

type SignupRequest struct {
	Username string `json:"username"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Pass     string `json:"pass"`
}

type SignupResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func handleSignup(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5175")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	// Handle preflight OPTIONS request
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK) // Changed from StatusConflict to StatusOK
		return
	}

	w.Header().Set("Content-Type", "application/json")

	// Only allow POST method
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Decode request body
	var req SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		json.NewEncoder(w).Encode(SignupResponse{
			Success: false,
			Message: "Invalid request format",
		})
		return
	}

	// Basic server-side validation
	if req.Username == "" || req.FullName == "" || req.Email == "" || req.Pass == "" {
		json.NewEncoder(w).Encode(SignupResponse{
			Success: false,
			Message: "All fields are required",
		})
		return
	}

	// Get database client
	client := database.GetSQLiteClient()

	// Insert user into database
	insertStmt := `
        INSERT INTO users (username, full_name, email, pass)
        VALUES (?, ?, ?, ?);
    `

	err := client.Execute(insertStmt, req.Username, req.FullName, req.Email, req.Pass)
	if err != nil {
		// Check for unique constraint violation
		if err.Error() == "UNIQUE constraint failed: users.username" {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(SignupResponse{
				Success: false,
				Message: "Username already taken",
			})
			return
		}
		if err.Error() == "UNIQUE constraint failed: users.email" {
			json.NewEncoder(w).Encode(SignupResponse{
				Success: false,
				Message: "Email already registered",
			})
			return
		}

		json.NewEncoder(w).Encode(SignupResponse{
			Success: false,
			Message: "Error creating account",
		})
		return
	}

	// Return success response
	json.NewEncoder(w).Encode(SignupResponse{
		Success: true,
		Message: "Account created successfully",
	})
}

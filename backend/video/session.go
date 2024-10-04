package video

import (
	"watchparty/chat"
)

var idCounter = 0 // TODO eventually, this will switch to getting auto-increments from DB

type Session struct {
	ID   int64
	Name string

	Path string // TODO figure out how this should work - stream or local filepath?
	Hub  *chat.ConnectionHub
}

func (s *Session) Run() {
	s.Hub.Routine()
}

func NewSession() Session {
	idCounter++
	return Session{
		ID:   int64(idCounter),
		Name: "",
		Path: "",

		Hub: chat.NewHub(),
	}
}

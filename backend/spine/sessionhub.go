package spine

import (
	"errors"
	"fmt"
	"sync"
	"watchparty/chat"
	"watchparty/video"
)

var idCounter = 0 // TODO eventually, this will switch to getting auto-increments from DB

type SessionHub struct {
	sessions map[int]*video.Session

	wg sync.WaitGroup
}

func NewSessionHub() *SessionHub {
	h := SessionHub{
		sessions: make(map[int]*video.Session),
	}
	h.wg.Add(1)

	h.NewSession("sample")

	return &h
}

func (h *SessionHub) NewSession(name string) *video.Session {
	s := &video.Session{
		ID:   int64(idCounter),
		Name: name,
		Path: "",

		Hub: chat.NewHub(),
	}
	h.wg.Add(1)

	h.sessions[idCounter] = s
	idCounter++

	go s.Run(&h.wg)

	return s
}

func (h *SessionHub) GetSession(id int) (*video.Session, error) {
	returns, ok := h.sessions[id]
	if !ok {
		return nil, errors.New(fmt.Sprintf("session %d not found", id))
	}
	return returns, nil
}

func (h *SessionHub) Run() {
	h.wg.Wait()
}

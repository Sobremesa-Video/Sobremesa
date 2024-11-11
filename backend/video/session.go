package video

import (
	"sync"
	"watchparty/chat"
	"watchparty/database"
)

type Session struct {
	ID   int64
	Name string

	Stream *Stream
	Hub    *chat.ConnectionHub
	DBConn *database.Client
}

func (s *Session) Run(group *sync.WaitGroup) {
	defer group.Done()
	defer print("session done")
	go s.Hub.ChatRoutine()
	s.Stream.StreamRoutine()
}

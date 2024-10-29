package video

import (
	"sync"
	"watchparty/chat"
	"watchparty/database"
)

type Session struct {
	ID   int64
	Name string

	Path   string // TODO figure out how this should work - stream or local filepath?
	Hub    *chat.ConnectionHub
	DBConn *database.Client
}

func (s *Session) Run(group *sync.WaitGroup) {
	defer group.Done()
	defer print("session done")
	s.Hub.Routine()
}

package video

import (
	"sync"
)

type Session struct {
	ID   int64
	Name string

	Path string // TODO figure out how this should work - stream or local filepath?
	Hub  *chat.ConnectionHub
}

func (s *Session) Run(group *sync.WaitGroup) {
	defer group.Done()
	defer print("session done")
	s.Hub.Routine()
}

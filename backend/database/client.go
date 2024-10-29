package database

import "database/sql"

type Client interface {
	Execute(statement string, args ...any) error
	Query(statement string, args ...any) (*sql.Rows, error)
	init() error
}

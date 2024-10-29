package database

import "database/sql"

type Client interface {
	Execute(statement string, args ...any)
	Query(statement string, args ...any) sql.Rows
	init()
}

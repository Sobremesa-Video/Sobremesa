package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type SQLiteClient struct {
	conn *sql.DB
}

func GetSQLiteClient() *SQLiteClient {
	conn := SQLiteClient{}
	_ = conn.init()
	return &conn
}

func (client *SQLiteClient) init() error {
	var err error

	client.conn, err = sql.Open("sqlite3", "main.db")
	if err != nil {
		return err
	}
	err = client.conn.Ping()

	return err
}

func (client *SQLiteClient) Execute(statement string, args ...any) error {
	_, err := client.conn.Exec(statement, args...)
	return err
}

func (client *SQLiteClient) Query(statement string, args ...any) (*sql.Rows, error) {
	return client.conn.Query(statement, args...)
}

package database

import "database/sql"

type SQLiteClient struct {
	conn *sql.DB
}

func (client *SQLiteClient) init() error {
	var err error
	client.conn, err = sql.Open("sqlite3", "main.db")

	return err
}

func (client *SQLiteClient) Execute(statement string, args ...any) error {
	_, err := client.conn.Exec(statement, args...)
	return err
}

func (client *SQLiteClient) Query(statement string, args ...any) (*sql.Rows, error) {
	return client.conn.Query(statement, args...)
}

package database

type Client interface {
	Execute(statement string, args ...any)
	Query(statement string, args ...any) Rows
}

type Rows interface {
	// TODO
}

func GetClient() *Client {
	// TODO
}
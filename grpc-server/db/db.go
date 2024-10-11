package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v4/pgxpool"
)

func ConnectDB() (*pgxpool.Pool, error) {
	connStr := "postgres://user:password@localhost:5432/mydb"
	pool, err := pgxpool.Connect(context.Background(), connStr)

	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}

	return pool, err
}

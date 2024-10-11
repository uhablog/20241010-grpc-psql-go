package main

import (
	"log"
	"net"

	"mygrpc/db"
	pb "mygrpc/pkg/grpc"
	"mygrpc/service"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	lis, err := net.Listen("tcp", ":8000")

	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	pool, err := db.ConnectDB()
	if err != nil {
		log.Fatal("failed to connect to Db")
	}

	grpcServer := grpc.NewServer()
	pb.RegisterPsqlServiceServer(grpcServer, &service.Server{Db: pool})

	// サーバーリフレクションの設定
	reflection.Register(grpcServer)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

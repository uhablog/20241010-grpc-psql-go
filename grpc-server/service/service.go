package service

import (
	"context"
	pb "mygrpc/pkg/grpc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type Server struct {
	pb.UnimplementedPsqlServiceServer
	Db *pgxpool.Pool
}

func (s *Server) SelectData(ctx context.Context, req *pb.SelectDataRequest) (*pb.SelectDataResponse, error) {
	var name string
	var age int32
	err := s.Db.QueryRow(ctx, "SELECT name, age FROM mytable WHERE id = $1", req.GetId()).Scan(&name, &age)
	if err != nil {
		return nil, err
	}
	return &pb.SelectDataResponse{
		Name: name,
		Age:  age,
	}, nil
}

import { Request, Response } from 'express';
import client from "../grpcClient";

type InsertDataType = {
  name: string
  age: number
}

export const insertData = (req: Request, res: Response) => {
  const { name, age }: InsertDataType = req.body;
  client.InsertData({name, age}, (err: any, response: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(response);
    }
  });
};
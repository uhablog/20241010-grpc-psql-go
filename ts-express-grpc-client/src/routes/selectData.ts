import { Request, Response } from "express";
import client from "../grpcClient";

export const selectData = (req: Request, res: Response) => {
  const id = req.params.id;

  client.SelectData({ id }, (err: any, response: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(response);
    }
  });
};
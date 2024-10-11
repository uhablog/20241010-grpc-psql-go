import express from 'express';
import * as grpc from '@grpc/grpc-js'; 
import * as protoLoader from '@grpc/proto-loader';
import path from "path";

const PROTO_PATH = path.resolve(__dirname, '../api/hello.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const myService = (grpcObject.myapp as any).PsqlService;

const client = new myService('localhost:8000', grpc.credentials.createInsecure());

const app = express();

app.get('/get-data/:id', (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id, 1);
  console.log(id);

  client.SelectData({ id: 1 }, (err: any, response: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(response);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

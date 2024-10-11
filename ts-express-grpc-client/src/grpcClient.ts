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

export default client;
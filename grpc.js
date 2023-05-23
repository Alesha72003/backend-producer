const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./message.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const messageProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

module.exports = function (f) {
  server.addService(messageProto.MessageService.service, {
    Notify: (call, callback) => {
      f(call).then((res) => callback(null, res));
    }
  });

  return server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("Server running at http://127.0.0.1:50051");
      server.start();
    }
  );
}
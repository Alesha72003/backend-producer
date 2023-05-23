const grpc = require("./grpc.js");
const kafka = require("./kafka-producer.js");

async function proceed(call) {
  await kafka.send(call.request);
  return {};
}

async function run() {
  await kafka();
  await grpc(proceed);
}

run();
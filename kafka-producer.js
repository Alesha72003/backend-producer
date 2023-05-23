const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['127.0.0.1:9092'],
});

const producer = kafka.producer();

module.exports = producer.connect;
module.exports.send = async (msg) => {
  await producer.send({
    topic: 'OnlineSend',
    messages: [
      { value: JSON.stringify(msg) }
    ]
  });
}
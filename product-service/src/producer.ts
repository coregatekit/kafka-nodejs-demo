import { Message } from 'kafkajs';
import kafka from './kafka';

const producer = kafka.producer();

const produce = async (topic: string, messages: Message[]) => {
  await producer.connect();

  try {
    console.log('Producing messages...');
    await producer.send({
      topic,
      messages,
    });
    console.log('Finish produce messages');
  } catch (error) {
    console.error(error);
  }
}

export {
  produce,
}
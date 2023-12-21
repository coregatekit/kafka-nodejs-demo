import { Message } from 'kafkajs';
import kafka from './kafka';

const producer = kafka.producer();

const produce = async (topic: string, messages: Message[]) => {
  await producer.connect();

  try {
    await producer.send({
      topic,
      messages,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await producer.disconnect();
  }
}

export {
  produce,
}
import { EachMessagePayload } from 'kafkajs';
import kafka from '../kafka';
import { Prisma } from '@prisma/client';
import { updateStock } from '../service';
import { KAFKA_TOPICS } from '../enum';

const consumer = kafka.consumer({ groupId: `product-service-update-stock` });

const consumeUpdateStock = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPICS.KAFKA_TOPIC_ORDER_UPDATE_STOCK, fromBeginning: true });
  await consumer.run({
    eachMessage: async (payload: EachMessagePayload) => {
      const message = payload.message.value?.toString('utf8');

      if (message) {
        const parsed = JSON.parse(message);
        const product = {
          code: parsed.code,
          stock: parsed.amount,
        } as Prisma.ProductUpdateInput;

        console.log(parsed);

        await updateStock(product);
      }
      console.log(message);
    }
  })
}

export default consumeUpdateStock;

import { EachMessagePayload } from 'kafkajs';
import { CURRENT_HOST, KAFKA_TOPIC_PRODUCT_CREATE } from '../config';
import kafka from '../kafka';
import { Prisma } from '@prisma/client';
import { createNewProduct } from '../service';

const consumer = kafka.consumer({ groupId: `order-service-${CURRENT_HOST}` });

const consumeCreateProduct = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPIC_PRODUCT_CREATE, fromBeginning: true });
  await consumer.run({
    eachMessage: async (payload: EachMessagePayload) => {
      const message = payload.message.value?.toString('utf8');

      if (message) {
        const parsed = JSON.parse(message);
        const product = {
          id: parsed.id,
          title: parsed.title,
          price: parsed.price,
        } as Prisma.ProductCreateInput;
        await createNewProduct(product);
      }
      console.log(message);
    }
  })
}

export default consumeCreateProduct;

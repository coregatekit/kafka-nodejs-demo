import { EachMessagePayload } from 'kafkajs';
import kafka from '../kafka';
import { Prisma } from '@prisma/client';
import { createNewProduct } from '../service';
import { KAFKA_TOPICS } from '../enum';

const consumer = kafka.consumer({ groupId: `order-service-product-create` });

const consumeCreateProduct = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPICS.KAFKA_TOPIC_PRODUCT_CREATE, fromBeginning: true });
  await consumer.run({
    eachMessage: async (payload: EachMessagePayload) => {
      const message = payload.message.value?.toString('utf8');

      if (message) {
        const parsed = JSON.parse(message);
        const product = {
          id: parsed.id,
          code: parsed.code,
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

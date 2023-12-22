import { EachMessagePayload } from 'kafkajs';
import kafka from '../kafka';
import { Prisma } from '@prisma/client';
import { updateProduct } from '../service';
import { KAFKA_TOPICS } from '../enum';

const consumer = kafka.consumer({ groupId: `order-service-product-update` });

const consumeUpdateProduct = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPICS.KAFKA_TOPIC_PRODUCT_UPDATE, fromBeginning: true });
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
        } as Prisma.ProductUpdateInput;

        console.log(parsed);

        await updateProduct(product);
      }
      console.log(message);
    }
  })
}

export default consumeUpdateProduct;

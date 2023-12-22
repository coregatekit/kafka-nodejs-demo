import { EachMessagePayload } from 'kafkajs';
import kafka from '../kafka';
import { deleteProduct } from '../service';
import { KAFKA_TOPICS } from '../enum';

const consumer = kafka.consumer({ groupId: `order-service-product-delete` });

const consumeDeleteProduct = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPICS.KAFKA_TOPIC_PRODUCT_DELETE, fromBeginning: true });
  await consumer.run({
    eachMessage: async (payload: EachMessagePayload) => {
      const message = payload.message.value?.toString('utf8');

      if (message) {
        const parsed = JSON.parse(message);
        await deleteProduct(parsed.code);
      }
      console.log(message);
    }
  })
}

export default consumeDeleteProduct;

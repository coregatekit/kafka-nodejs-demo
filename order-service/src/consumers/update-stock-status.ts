import { EachMessagePayload } from 'kafkajs';
import kafka from '../kafka';
import { updateStockStatus } from '../service';
import { KAFKA_TOPICS, UPDATE_STOCK_STATUS } from '../enum';

const consumer = kafka.consumer({ groupId: `order-service-product-update` });

export type StockUpdateStatus = {
  code: string;
  status: UPDATE_STOCK_STATUS;
}

const consumeUpdateStockStatus = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPICS.KAFKA_TOPIC_ORDER_UPDATE_STOCK_STATUS, fromBeginning: true });
  await consumer.run({
    eachMessage: async (payload: EachMessagePayload) => {
      const message = payload.message.value?.toString('utf8');

      if (message) {
        const parsed = JSON.parse(message);
        const stock = {
          code: parsed.code,
          status: parsed.status,
        } as StockUpdateStatus;

        console.log(stock);

        await updateStockStatus(stock);
      }
      console.log(message);
    }
  })
}

export default consumeUpdateStockStatus;

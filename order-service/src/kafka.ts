import { Kafka, logLevel } from 'kafkajs';
import { CURRENT_HOST, KAFKA_HOST } from './config';

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [KAFKA_HOST],
  clientId: `kafka-client-${CURRENT_HOST}`,
});

export default kafka;

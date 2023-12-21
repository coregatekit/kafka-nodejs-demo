import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

const CURRENT_HOST = os.hostname();
const PORT = process.env.NODE_ENV || 9001;
const KAFKA_HOST = process.env.KAFKA_HOST || '';
const KAFKA_TOPIC_PRODUCT_CREATE = process.env.KAFKA_TOPIC_PRODUCT_CREATE || '';

export {
  CURRENT_HOST,
  PORT,
  KAFKA_HOST,
  KAFKA_TOPIC_PRODUCT_CREATE,
}
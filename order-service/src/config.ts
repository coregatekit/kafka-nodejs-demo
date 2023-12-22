import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

const CURRENT_HOST = os.hostname();
const PORT = process.env.PORT || 9000;
const KAFKA_HOST = process.env.KAFKA_HOST || '';

export {
  CURRENT_HOST,
  PORT,
  KAFKA_HOST,
}
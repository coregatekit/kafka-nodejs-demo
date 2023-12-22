import { Prisma } from '@prisma/client';
import { Message } from 'kafkajs';

import prisma from './database';
import { produce } from './producer';
import { KAFKA_TOPICS } from './enum';

async function getAllProducts() {
  return await prisma.product.findMany();
}

async function getProduct(id: number) {
  return await prisma.product.findFirst({ where: { id } });
}

async function createProduct(data: Prisma.ProductCreateInput) {
  data.code = Date.now().toString();
  const product = await prisma.product.create({ data })

  const json = JSON.stringify(product);
  const buffer = Buffer.from(json);
  const payload: Message[] = [{
    value: buffer,
  }];
  await produce(KAFKA_TOPICS.KAFKA_TOPIC_PRODUCT_CREATE, payload);

  return product;
}

async function updateProduct(id: number, data: Prisma.ProductUpdateInput) {
  const product = await prisma.product.update({
    where: { id },
    data
  });

  const json = JSON.stringify(product);
  const buffer = Buffer.from(json);
  const payload: Message[] = [{
    value: buffer,
  }];
  await produce(KAFKA_TOPICS.KAFKA_TOPIC_PRODUCT_UPDATE, payload);

  return product;
}

async function deleteProduct(id: number) {
  return await prisma.product.delete({ where: { id } });
}

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
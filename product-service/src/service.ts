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
  const result = await prisma.product.delete({ where: { id } });

  if (result) {
    const json = JSON.stringify({ code: result.code });
    const buffer = Buffer.from(json);
    const payload: Message[] = [{
      value: buffer,
    }];
    await produce(KAFKA_TOPICS.KAFKA_TOPIC_PRODUCT_DELETE, payload);
  }

  return result;
}

async function updateStock(data: Prisma.ProductUpdateInput) {
  const product = await prisma.product.findFirst({ where: { code: data.code as string } });

  if (product) {
    product.stock -= data.stock as number;

    if (product.stock < 0) {
      // produce not enough product
    }

    // produce completed
  }

  // produce error not found
}

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
}
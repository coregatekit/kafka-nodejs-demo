import { Prisma } from '@prisma/client';
import prisma from './database';

async function getAllProducts() {
  return await prisma.product.findMany();
}

async function getProduct(id: number) {
  return await prisma.product.findFirst({ where: { id } });
}

async function createProduct(data: Prisma.ProductCreateInput) {
  return await prisma.product.create({ data })
}

export {
  getAllProducts,
  getProduct,
  createProduct,
}
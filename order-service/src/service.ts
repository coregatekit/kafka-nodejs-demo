import { Prisma } from '@prisma/client';
import prisma from './database';

async function createNewProduct(msg: Prisma.ProductCreateInput) {
  const product = await prisma.product.create({
    data: {
      id: msg.id,
      title: msg.title,
      price: msg.price,
    },
  });
  if (product) {
    console.log(`Product ${product.title} has been create.`);
  }
}

export {
  createNewProduct,
}
import prisma from './database';

async function getAllProducts() {
  return await prisma.product.findMany();
}

export {
  getAllProducts,
}
import { Prisma } from '@prisma/client';
import prisma from './database';

async function createNewProduct(msg: Prisma.ProductCreateInput) {
  const product = await prisma.product.create({
    data: {
      code: msg.code,
      title: msg.title,
      price: msg.price,
    },
  });

  if (product) {
    console.log(`Product ${product.title} has been create.`);
  }
}

async function updateProduct(msg: Prisma.ProductUpdateInput) {
  const product = await prisma.product.update({
    where: { code: msg.code as string },
    data: msg
  });

  if (product) {
    console.log(`Product ${product.title} has been update.`);
  }
}

async function deleteProduct(code: string) {
  const result = await prisma.product.delete({ where: { code } });

  if (result) {
    console.log(`Product ${result.title} has bee delete.`);
  }
}

export {
  createNewProduct,
  updateProduct,
  deleteProduct,
}
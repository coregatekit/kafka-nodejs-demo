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

// async function updateProduct(msg: Prisma.ProductUpdateInput) {
//   const product = await prisma.product.update({
//     where: { id: parseInt(msg.id!.toString()) },
//     data: msg
//   });

//   if (product) {
//     console.log(`Product ${product.title} has been update.`);
//   }
// }

export {
  createNewProduct,
  // updateProduct,
}
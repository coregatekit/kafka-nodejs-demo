import { PaymentStatus, Prisma } from '@prisma/client';
import prisma from './database';

async function getOrderDetail(options: Prisma.OrderWhereInput) {
  return await prisma.order.findFirst({
    where: { ...options },
    include: {
      product: true,
    }
  });
}

async function getAllOrderDetails(options: Prisma.OrderWhereInput) {
  return await prisma.order.findMany({ where: { ...options } });
}

async function createOrder(data: Prisma.OrderCreateInput) {
  data.code = Date.now().toString();
  return await prisma.order.create({
    data,
  });
}

async function updateOrder(code: string, data: Prisma.OrderUpdateInput) {
  return await prisma.order.update({
    where: { code },
    data,
  });
}

async function paidOrder(code: string) {
  const order = await prisma.order.update({
    where: { code },
    data: {
      paymentStatus: PaymentStatus.PAID,
    },
  });

  // update product stock

  return order;
}

async function cancelOrder(code: string) {
  return await prisma.order.update({
    where: { code },
    data: {
      paymentStatus: PaymentStatus.CANCELED,
    },
  });
}

async function deleteOrder(code: string) {
  return await prisma.order.delete({
    where: { code },
  });
}

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
  getOrderDetail,
  getAllOrderDetails,
  createOrder,
  updateOrder,
  paidOrder,
  cancelOrder,
  deleteOrder,
  createNewProduct,
  updateProduct,
  deleteProduct,
}
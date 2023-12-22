import { PaymentStatus, Prisma } from '@prisma/client';
import prisma from './database';
import { Message } from 'kafkajs';
import { produce } from './producer';
import { KAFKA_TOPICS, UPDATE_STOCK_STATUS } from './enum';
import { StockUpdateStatus } from './consumers/update-stock-status';

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
      paymentStatus: PaymentStatus.PENDING,
    },
  });

  const json = JSON.stringify({
    stock: order.amount,
  });
  const buffer = Buffer.from(json);
  const payload: Message[] = [{
    value: buffer,
  }];
  await produce(KAFKA_TOPICS.KAFKA_TOPIC_PRODUCT_CREATE, payload);

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

async function updateStockStatus(data: StockUpdateStatus) {
  try {
    switch (data.status) {
      case UPDATE_STOCK_STATUS.FAILED:
        await prisma.order.update({
          where: { code: data.code },
          data: {
            paymentStatus: PaymentStatus.FAILED,
          },
        });
        console.log(`Payment failed because some error has occured on product service!`);
        break;
      case UPDATE_STOCK_STATUS.NOT_ENOUGH:
        await prisma.order.update({
          where: { code: data.code },
          data: {
            paymentStatus: PaymentStatus.STOCK_NOT_ENOUGH,
          },
        });
        console.log(`Payment failed because product ${data.code} not enough!`);
        break;
      case UPDATE_STOCK_STATUS.NOT_FOUND:
        await prisma.order.update({
          where: { code: data.code },
          data: {
            paymentStatus: PaymentStatus.STOCK_NOT_ENOUGH,
          },
        });
        console.log(`Payment failed because product ${data.code} not found!`);
        break;
      case UPDATE_STOCK_STATUS.SUCCESS:
        await prisma.order.update({
          where: { code: data.code },
          data: {
            paymentStatus: PaymentStatus.PAID,
          },
        });
        console.log(`Payment success!`);
        break;
    }
  } catch (error) {
    console.error(error);
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
  updateStockStatus,
  createNewProduct,
  updateProduct,
  deleteProduct,
}
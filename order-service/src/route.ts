import { Prisma } from '@prisma/client';
import { Request, Response, Router } from 'express';
import { cancelOrder, createOrder, deleteOrder, getAllOrderDetails, getOrderDetail, paidOrder, updateOrder } from './service';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const options: Prisma.OrderWhereInput = req.query;

    const orders = await getAllOrderDetails(options);

    res.status(200).json(orders).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get('/details', async (req: Request, res: Response) => {
  try {
    const options: Prisma.OrderWhereInput = req.query;

    const order = await getOrderDetail(options);

    if (!order) {
      res.status(400).json({ msg: 'Order not found.' });
      return;
    }

    res.status(200).json(order).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const input: Prisma.OrderCreateInput = req.body;

    const orders = await createOrder(input);

    res.status(200).json(orders).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.patch('/:code/update', async (req: Request, res: Response) => {
  try {
    const code = req.params.code as string;
    const input: Prisma.OrderCreateInput = req.body;

    const order = await updateOrder(code, input);

    if (!order) {
      res.status(400).json({ msg: 'Order not found.' });
      return;
    }

    res.status(200).json(order).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.patch('/:code/paid', async (req: Request, res: Response) => {
  try {
    const code = req.params.code as string;

    const order = await paidOrder(code);

    if (!order) {
      res.status(400).json({ msg: 'Order not found.' });
      return;
    }

    res.status(200).json(order).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.patch('/:code/cancel', async (req: Request, res: Response) => {
  try {
    const code = req.params.code as string;

    const order = await cancelOrder(code);

    if (!order) {
      res.status(400).json({ msg: 'Order not found.' });
      return;
    }

    res.status(200).json(order).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.delete('/:code/delete', async (req: Request, res: Response) => {
  try {
    const code = req.params.code as string;

    const order = await deleteOrder(code);

    if (!order) {
      res.status(400).json({ msg: 'Order not found.' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export default router;

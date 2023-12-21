import { Prisma } from '@prisma/client';
import { Request, Response, Router } from 'express';
import { updateProduct, createProduct, getAllProducts, getProduct, deleteProduct } from './service';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.status(200).json(products).send();
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await getProduct(parseInt(id));
  if (!product) {
    res.status(400).json({ msg: 'Product not found' }).send();
    return;
  }
  res.status(200).json(product).send();
});

router.post('/', async (req: Request, res: Response) => {
  const input: Prisma.ProductCreateInput = req.body;
  const product = await createProduct(input);
  res.status(201).json(product).send();
});

router.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const input: Prisma.ProductUpdateInput = req.body;
  const product = await updateProduct(parseInt(id), input);
  res.status(200).json(product).send();
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteProduct(parseInt(id));
  res.status(204).send();
});

export default router;

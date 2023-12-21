import { Request, Response, Router } from 'express';
import { getAllProducts } from './service';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.status(200).json(products).send();
});

router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.status(200).send(`Get product id = ${id}`);
});

router.post('/', (req: Request, res: Response) => {
  res.status(200).send('Create new product');
});

router.patch('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.status(200).send(`Update product id = ${id}`);
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.status(200).send(`Delete product id = ${id}`);
});

export default router;

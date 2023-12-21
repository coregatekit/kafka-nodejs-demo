import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Get all products');
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

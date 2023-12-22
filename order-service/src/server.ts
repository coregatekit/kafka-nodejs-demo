import express, { json, Request, Response, Application } from 'express';
import morgan from 'morgan';
import router from './route';
import { CURRENT_HOST, PORT } from './config';
import consumeCreateProduct from './consumers/create-product';

const app: Application = express();
app.listen(PORT, () => console.log(`${CURRENT_HOST} Product Server is running on port ${PORT}`));
app.use(json());
app.use(morgan('combined'));

consumeCreateProduct();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello Product Service');
});
app.use('/api/products', router);
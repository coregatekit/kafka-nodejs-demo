import express, { json, Request, Response, Application } from 'express';
import morgan from 'morgan';
import router from './route';
import { CURRENT_HOST } from './config';

const app: Application = express();
app.listen(9001, () => console.log(`${CURRENT_HOST} Product Server is running on port 9001`));
app.use(json());
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello Product Service');
});
app.use('/api/products', router);
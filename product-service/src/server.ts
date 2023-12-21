import express, { json, Request, Response, Application } from 'express';
import router from './route';

const app: Application = express();
app.listen(9001, () => console.log(`Product Server is running on port 9001`));
app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello Product Service');
});
app.use('/api/products', router);
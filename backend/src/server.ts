import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppErrors from './errors/AppErrors';

import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.diretory));
app.use(cors());
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppErrors) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  console.error(error);

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => console.log('⚙️ Server started on port 3333'));

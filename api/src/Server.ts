import express, { Application, Request, Response } from 'express';
import cors from 'express';

import { APP_PORT, SERVER_PATH, SERVER_API_PATH, RELATIVE_API_PATH } from './config/app';
import { connectMongoDB } from './config/database/mongoDB';

import publicRoutes from './routes/public';
import privateRoutes from './routes/private';
import { validateJWT } from './middlewares/generals/jwtValidator';

declare global {
  namespace Express {
    interface Request {
      userLogged: { id: string };
    }
  }
}

class Server {
  private PORT: string;
  private app: Application;

  constructor() {
    this.app = express();
    this.PORT = APP_PORT;

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await connectMongoDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(`${RELATIVE_API_PATH}`, publicRoutes);
    this.app.use(`${RELATIVE_API_PATH}`, validateJWT, privateRoutes);

    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).send('Not found');
    });
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.clear();
      console.log('');
      console.log('############################');
      console.log('###### SERVER RUNNING ######');
      console.log('############################');
      console.log('');
      console.log(`Path: ${SERVER_PATH}`);
      console.log(`Path API: ${SERVER_API_PATH}`);
      console.log(`Application running on port: ${this.PORT}`);
      console.log('');
    });
  }
}

export default Server;

import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import commandController from './controllers/command/command-controller';


class AppServer {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.registerRoutes();
  }

  private middleware(): void {
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private registerRoutes(): void {
    this.express.use('/', commandController);
  }

}

export default new AppServer().express

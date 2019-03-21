import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import * as dynamoose from 'dynamoose';
import * as express from 'express';
import timeController from './controllers/time-controller';


class AppServer {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.init();
    this.middleware();
    this.registerRoutes();
  }

  private init(): void {
    dynamoose.AWS.config.update({
      accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID,
      secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY,
      region: process.env.DYNAMO_REGION
    });
  }

  private middleware(): void {
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private registerRoutes(): void {
    this.express.use('/', timeController);
  }

}

export default new AppServer().express

import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';
const mongoStore = connectMongo(session);
import * as mongoose from 'mongoose';

import config from './config/config';
import apiRouter from './api/index';

class App {

  express: express.Application;
  env: string;

  constructor() {
    this.env = process.env.NODE_ENV || 'production';
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandlers();
  }

  private middleware(): void {
    this.express.use(morgan(this.env === 'development' ? 'dev' : 'common'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(helmet({
      frameguard: false,
    }));
    // app.set('trust proxy', 1) // in case of proxy
    this.express.use(session({
      secret: config.secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        // TODO: enable, when https is enabled
        // secure: true,
      },
      name: 'session',
      store: new mongoStore({ mongooseConnection: mongoose.connection }),
    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  private routes(): void {
    this.express.use('/api', apiRouter);
    this.express.use(express.static(config.publicDir));
    this.express.use('/assets/', express.static(config.uploadsDir));
    this.express.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(config.publicDir, 'index.html'));
    });
  }

  private errorHandlers(): void {
    this.express.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err);
      if ( this.env === 'development' ) {
        res.status(500).json(err);
      } else {
        res.status(500).json('Something broke.');
      }
    });
  }
}

export default new App().express;

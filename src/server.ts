import express, { Request, Response, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import connect_mongo from 'connect-mongo';
import { configuration, IConfig } from './config';

import generalRouter from './routes/router';
import { connect } from './database';
import { authenticationInitialize, authenticationSession } from './controllers/authenticationController';
import { initializeSocket } from './socket';

const MongoStore = connect_mongo(session);
const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });

export function createExpressApp(config: IConfig): express.Express {
  const { express_debug, session_cookie_name, session_secret } = config;

  const app = express();

  app.use(morgan('combined'));
  app.use(helmet());
  app.use(cors({
    origin: true,
    credentials: true
  }));
  app.use(express.json());
  app.use(session({
    name: session_cookie_name,
    secret: session_secret,
    store: sessionStore, // Recup connexion from mongoose
    saveUninitialized: false,
    resave: false,
  }));
  app.use(authenticationInitialize());
  app.use(authenticationSession());

  app.use(((err, _req, res, _next) => {
    console.error(err.stack);
    res.status?.(500).send(!express_debug ? 'Oups' : err);
  }) as ErrorRequestHandler);

  app.get('/', (req: Request, res: Response) => { res.send('This is the boilerplate for Flint Messenger app'); });

  app.use('/api', generalRouter);

  return app;
}

const config = configuration();
const { PORT } = config;
const app = createExpressApp(config);
connect(config).then(
  () => {
    const server = app.listen(PORT, () => console.log(`Flint messenger listening at ${PORT}`))

    initializeSocket(config, server, sessionStore);
  },
);

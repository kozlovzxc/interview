import * as express from 'express';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserModel from '../models/userModel';
import { userRouter } from './user';

// username param defaults to 'username'
// password param defaults to 'password'
passport.use(new LocalStrategy(
  (username: string, password: string, done: any) => {
    UserModel
      .findOne({ username, password })
      .exec()
      .then((user) => user ? done(null, user) : done(null, false, { message: 'Incorrect.' }))
      .catch((err) => done(err));
  },
));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, '-password')
    .exec()
    .then((user: any) => done(null, user))
    .catch((err: any) => done(err));
});

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);

apiRouter.get('/ping', (req: express.Request, res: express.Response) => {
  res.send('pong');
});

apiRouter.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).send('No api 4 u');
});

export default apiRouter;

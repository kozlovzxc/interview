import * as express from 'express';
import * as passport from 'passport';
import * as Joi from 'joi';
import * as uuid from 'uuid/v4';

import UserModel from '../models/userModel';
import validate from '../middleware/validate';
import authenticate from '../middleware/authenticate';

const userRouter = express.Router();

userRouter.get('/',
  [
    authenticate(),
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.json(req.user);
  },
);

userRouter.post('/authenticate', [
    validate({
      body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().min(8).required(),
      }),
    }),
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate('local', (err: Error, user: any, info: any) => {
      if (err) { next(err); }
      if (!user) { res.status(401).json('No such user, password pair'); }
      req.logIn(user, (err: Error) => {
        if (err) { next(err); }
        req.app.get('socketio').emit('update/user');
        res.json('Done');
      });
    })(req, res, next);
  },
);

userRouter.post('/register', [
    validate({
      body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().min(8).required(),
      }),
    }),
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = uuid();
    const user = new UserModel({
      id,
      username: req.body.username,
      password: req.body.password,
      role: 'user',
    });
    user
      .save()
      .then(() => res.json('Done'))
      .catch((err) => next(err));
  },
);

userRouter.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).send('No api 4 u');
});

export { userRouter };

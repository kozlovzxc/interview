import * as express from 'express';

function authenticate() {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.user) {
      res.status(401).json('Unauthenticated');
    } else {
      next();
    }
  };
}

export default authenticate;

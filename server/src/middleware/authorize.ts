import * as express from 'express';

function authorize(role: string) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.user) {
      res.status(401).json('Unauthenticated');
    } else if (req.user.role !== role) {
      res.status(403).json('Unauthorized');
    } else {
      next();
    }
  };
}

export default authorize;

import * as express from 'express';

export default function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req['user']) {
    return next(false);
  }
  if (req['user'].isAdmin) {
    return next();
  }
  return next(false);
}
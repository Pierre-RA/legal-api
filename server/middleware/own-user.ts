import * as express from 'express';

export default function isOwnUser(
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
  if (!req.params.id) {
    return next(false);
  }
  if (req['user'].id == req.params.id) {
    return next();
  }
  return next(false);
}
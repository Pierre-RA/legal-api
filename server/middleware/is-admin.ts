import * as express from 'express';

export default function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req['user']) {
    return next('no user.');
  }
  if (req['user'].isAdmin) {
    return next();
  }
  return next('provided user is not an admin.');
}
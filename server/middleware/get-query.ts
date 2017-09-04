import * as express from 'express';

export default function getQuery(req: express.Request, params?: Object) {
  let query = params || {};
  if (!req['user']) {
    return null;
  }
  if (req['user'].isAdmin) {
    return query;
  }
  if (!req['user']._id) {
    return null;
  }
  query['owner'] = req['user']._id;
  return query;
}
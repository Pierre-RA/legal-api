import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

import { Token } from '../../models/tokens';

const router: express.Router = express.Router();

const devError = (err: Error, res: express.Response) => {
  return res.status(400).json({
    error: err
  });
}

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', isAdmin, (req: express.Request, res: express.Response) => {
  Token.find({}, (err, docs) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(docs);
  });
});

router.get('/count', isAdmin, (req: express.Request, res: express.Response) => {
  Token.count((err: any, count: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({
      count: count
    });
  });
});

router.post('/', isAdmin, (req: express.Request, res: express.Response) => {
  let token = new Token();
  token.save((err: any, doc: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.delete('/:id', isAdmin, (req: express.Request, res: express.Response) => {
  Token.findByIdAndRemove(req.params.id, {}, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    res.json({
      message: 'token has been deleted.',
    });
  });
});

export default router;

function isAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.user) {
    return next(false);
  }
  return req.user.isAdmin;
}
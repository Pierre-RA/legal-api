import * as express from 'express';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

import isAdmin from '../../middleware/is-admin';
import sendMail from '../../utils/email';
import { Token } from '../../models/tokens';

const router: express.Router = express.Router();

const devError = (err: Error, res: express.Response) => {
  return res.status(400).json({
    error: err
  });
}

router.options('/', cors());
router.options('/count', cors());
router.options('/:id', cors());
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
  let token = new Token(req.body);
  token.save((err: any, doc: any) => {
    sendMail(doc);
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
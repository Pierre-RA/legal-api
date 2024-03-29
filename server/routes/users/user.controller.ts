import * as express from 'express';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

import isOwnUser from '../../middleware/own-user';
import { User } from '../../models/user';

const router: express.Router = express.Router();

const devError = (err: Error, res: express.Response) => {
  return res.status(400).json({
    error: err
  });
}

router.options('/', cors());
router.options('/:id', cors());
router.options('/count', cors());
router.options('/own', cors());
router.use(passport.authenticate('jwt', {session: false}));

router.get('/', (req: express.Request, res: express.Response) => {
  User.find({}, (err, docs) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(docs);
  });
});

router.get('/count', (req: express.Request, res: express.Response) => {
  User.count((err: any, count: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({
      count: count
    });
  });
});

router.get('/own', (req: express.Request, res: express.Response) => {
  if (!req.user) {
    return devError(new Error('No user found.'), res);
  }
  User.findOne({ _id: req.user.id }, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.put('/:id', isOwnUser, (req: express.Request, res: express.Response) => {
  User.findOneAndUpdate(
    { '_id': req.params.id }, req.body, {new: true}, (err: any, doc: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.delete('/:id', isOwnUser, (req: express.Request, res: express.Response) => {
  User.findByIdAndRemove(req.params.id, {}, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    res.json({
      message: 'contract with id: ' + req.params.id + ' has been deleted.',
      contact: doc
    });
  });
});

export default router;



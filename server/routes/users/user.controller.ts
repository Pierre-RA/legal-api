import * as express from 'express';
import * as mongoose from 'mongoose';

import { User } from '../../models/user';

const router: express.Router = express.Router();

const devError = (err: Error, res: express.Response) => {
  return res.status(400).json({
    error: err
  });
}

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

router.get('/count/:type', (req: express.Request, res: express.Response) => {
  User.find({ type: req.params.type }).count((err, count) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({
      count: count
    });
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

router.post('/', (req: express.Request, res: express.Response) => {
  let user = new User(req.body);
  user.save((err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.put('/:id', (req: express.Request, res: express.Response) => {
  User.findOneAndUpdate(
    { '_id': req.params.id }, req.body, {new: true}, (err: any, doc: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.delete('/:id', (req: express.Request, res: express.Response) => {
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

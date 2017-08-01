import * as express from 'express';
import * as mongoose from 'mongoose';

import Contract from '../../models/contract';

const router: express.Router = express.Router();

const devError = (err: Error, res: express.Response) => {
  return res.status(400).json({
    error: err
  });
}

router.get('/', (req: express.Request, res: express.Response) => {
  Contract.find({}, (err, docs) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(docs);
  });
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  Contract.findOne({ id: req.params.id }, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.post('/', (req: express.Request, res: express.Response) => {
  let contract = new Contract(JSON.parse(req.body.contract));
  contract.save((err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.put('/:id', (req: express.Request, res: express.Response) => {
  let contract = new Contract(JSON.parse(req.body.contract));
  res.json({
    error: 'Not implemented yet.'
  });
});

router.delete('/:id', (req: express.Request, res: express.Response) => {
  Contract.findByIdAndRemove(req.params.id, {}, (err, doc) => {
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
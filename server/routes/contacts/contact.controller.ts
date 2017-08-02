import * as express from 'express';
import * as mongoose from 'mongoose';

import { Contact } from '../../models/contact';

const router: express.Router = express.Router();

const devError = (err: Error, res: express.Response) => {
  return res.status(400).json({
    error: err
  });
}

router.get('/', (req: express.Request, res: express.Response) => {
  Contact.find({}, (err, docs) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(docs);
  });
});

router.get('/count', (req: express.Request, res: express.Response) => {
  Contact.count((err, count) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({
      count: count
    });
  });
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  Contact.findOne({ id: req.params.id }, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.post('/', (req: express.Request, res: express.Response) => {
  console.log(req.body);
  let contact = new Contact(req.body);
  contact.save((err: any, doc: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.put('/:id', (req: express.Request, res: express.Response) => {
  let contact = new Contact(req.body);
  res.json({
    error: 'Not implemented yet.'
  });
});

router.delete('/:id', (req: express.Request, res: express.Response) => {
  Contact.findByIdAndRemove(req.params.id, {}, (err: any, doc: any) => {
    if (err) {
      return devError(err, res);
    }
    res.json({
      message: 'contact with id: ' + req.params.id + ' has been deleted.',
      contact: doc
    });
  });
});

export default router;

import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import * as mongoose from 'mongoose';

import getQuery from '../../middleware/get-query';
import { Contact } from '../../models/contact';

const router: express.Router = express.Router();

const devError = (err: Error, res: express.Response) => {
  return res.status(400).json({
    error: err
  });
}

router.options('/', cors());
router.options('/count', cors());
router.options('/count/:type', cors());
router.options('/:id', cors());
router.use(passport.authenticate('jwt', {session: false}));

router.get('/', (req: express.Request, res: express.Response) => {
  let query = getQuery(req);
  if (!query) {
    return res.status(401).json({ message: 'unauthorized.' });
  }
  Contact.find(query, (err, docs) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(docs);
  });
});

router.get('/count', (req: express.Request, res: express.Response) => {
  let query = getQuery(req);
  if (!query) {
    return res.status(401).json({ message: 'unauthorized.' });
  }
  Contact.count(query, (err: any, count: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({
      count: count
    });
  });
});

router.get('/count/:type', (req: express.Request, res: express.Response) => {
  let query = getQuery(req, { type: req.params.type });
  if (!query) {
    return res.status(401).json({ message: 'unauthorized.' });
  }
  Contact.find(query).count((err, count) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({
      count: count
    });
  });
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  let query = getQuery(req, { _id: req.params.id });
  if (!query) {
    return res.status(401).json({ message: 'unauthorized.' });
  }
  Contact.findOne(query, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.post('/', (req: express.Request, res: express.Response) => {
  let contact = new Contact(req.body);
  contact.owner = req.user._id;
  contact.save((err: any, doc: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.put('/:id', (req: express.Request, res: express.Response) => {
  let query = getQuery(req, { _id: req.params.id });
  if (!query) {
    return res.status(401).json({ message: 'unauthorized.' });
  }
  Contact.findOneAndUpdate(
    query, req.body, {new: true}, (err: any, doc: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
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

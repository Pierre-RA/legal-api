import * as express from 'express';
import * as mongoose from 'mongoose';

import * as fs from 'fs';
import * as Docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';

import Contract from '../../models/contract';
import { exportContract } from '../../models/export';

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

router.get('/count', (req: express.Request, res: express.Response) => {
  Contract.count((err: any, count: any) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({
      count: count
    });
  });
});

router.get('/count/:type', (req: express.Request, res: express.Response) => {
  Contract.find({ type: req.params.type }).count((err, count) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({
      count: count
    });
  });
});

router.get('/export/:id', (req: express.Request, res: express.Response) => {
  Contract.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(exportContract(doc));
    // let data = exportContract(doc);
    // let template = __dirname + '/../../templates/contrat_pret_cro.docx';
    // let file = generateFile(template, data);
    // let filename = doc.title + '.docx';
    // let mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    //
    // res.writeHead(200, {
    //   'Content-Type': mimetype,
    //   'Content-disposition': 'attachment;filename=' + filename,
    //   'Content-Length': file.length
    // });
    // return res.end(new Buffer(file, 'binary'));
  });
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  Contract.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.post('/', (req: express.Request, res: express.Response) => {
  let contract = new Contract(req.body);
  contract.save((err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json(doc);
  });
});

router.put('/:id', (req: express.Request, res: express.Response) => {
  let contract = new Contract(req.body.contract);
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

function generateFile(template: string, data: Object) {
  let content = fs.readFileSync(template, 'binary');
  let zip = new JSZip(content);
  let doc = new Docxtemplater();
  doc.loadZip(zip);
  doc.setData(data);
  try {
    doc.render();
  } catch(error) {
    throw new Error('Cannot parse template file: ' + error);
  }
  return doc.getZip().generate({
    type: 'nodebuffer'
  });
}

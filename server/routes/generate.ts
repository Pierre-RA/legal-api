// declare var require:(moduleId:string) => any;
import * as fs from "fs";

import * as Docxtemplater from "docxtemplater";
import * as JSZip from "jszip";
import {Request, Response} from "express";

/**
 * GET /
 * Home page.
 */
export let generate = (req: Request, res: Response) => {
  var content = fs
    .readFileSync(__dirname + '/../templates/contrat_pret_cro.docx', 'binary');

  var zip = new JSZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  doc.setData({
    first_name: 'John',
    last_name: 'Doe',
    phone: '0652455478',
    description: 'New Website'
  });

  try {
    doc.render();
  } catch(error) {
    throw error;
  }

  var buf = doc.getZip().generate({type: 'nodebuffer'});

  let filename = 'contrat_pret_cro.docx';
  let mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  res.writeHead(200, {
    'Content-Type': mimetype,
    'Content-disposition': 'attachment;filename=' + filename,
    'Content-Length': buf.length
  });
  res.end(new Buffer(buf, 'binary'));
};

import * as fs from 'fs';

import * as Docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';
import { Request, Response } from 'express';

/**
 * GET /generator/:fileId
 * Get the docx file for fileId
 */
export let generate = (req: Request, res: Response) => {
  if (!req.params.fileId) {
    return res.status(404)
      .json({
        message: 'File not found.'
      });
  }
  let data = getMockupContract();
  let template = __dirname + '/../templates/contrat_pret_cro.docx';
  let file = generateFile(template, data);
  let filename = 'contrat_pret_cro.docx';
  let mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  res.writeHead(200, {
    'Content-Type': mimetype,
    'Content-disposition': 'attachment;filename=' + filename,
    'Content-Length': file.length
  });
  res.end(new Buffer(file, 'binary'));
}

/**
 * generateFile
 * Create from a template and defined values the desired file.
 */
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

function getMockupContract(): Object {
  // let contract = new Contract(
  //   new PhysicalPerson(
  //     'Pierre',
  //     "Repetto-Andipatin",
  //     true,
  //     new Address('rue des confessions, 15', '', '', '1203', 'Genève', '', 'Suisse'),
  //     '+41799646355',
  //     'pierre@anthillsolutions.ch'
  //   ),
  //   new PhysicalPerson(
  //     'Célia',
  //     'Tinard',
  //     false,
  //     new Address('47 chemin Aurélien', '', '', '83700', 'Saint-Raphaël', '', 'France'),
  //     '+3364545454',
  //     'celia.tinard@gmail.com'
  //   ),
  //   new Loan(
  //     'CHF',
  //     12000,
  //     7.5
  //   )
  // );
  let result = {};
  // if (contract.isSound()) {
  //   result = contract.export();
  // }
  return result;
}

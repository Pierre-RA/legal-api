import { Request, Response } from "express";
let pkg = require(__dirname + '/../../package.json');

export let index = (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Legal API.',
    version: pkg.version,
  });
}

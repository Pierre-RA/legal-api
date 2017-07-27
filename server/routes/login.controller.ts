import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { JwtOptions } from '../models/jwtoptions';
import { MockupUsers } from '../models/mockupUsers';

const users = new MockupUsers();

export let login = (req: Request, res: Response) => {
  if (!req.body.name && !req.body.password) {
    return res.status(401).json({message: 'Not enough information for login.'});
  }
  let name = req.body.name;
  let password = req.body.password;

  try {
    let user = users.findByName(name);
    if (user.password == password) {
      let payload = {id: user.id};
      let token = jwt.sign(payload, JwtOptions.secretOrKey);
      return res.json({message: 'ok', token: token});
    } else {
      return res.status(401).json({message: 'No such user found.'});
    }
  } catch(error) {
    return res.status(401).json({message: 'No such user found.'});
  }
}

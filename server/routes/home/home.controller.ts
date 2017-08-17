import * as express from 'express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

dotenv.config();
let pkg = require(__dirname + '/../../../package.json');
import { JwtOptions } from '../../models/jwtoptions';
import { User } from '../../models/user';

const router: express.Router = express.Router();

/**
 * devError - simple output function
 */
const devError = (err: Error, res: express.Response) => {
  return res.status(400).json({
    error: err
  });
}

/**
 * GET /
 * return server API
 */
router.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Welcome to Legal API.',
    version: pkg.version,
  });
});

/**
 * PUT /login
 * attempt a sign-in and return a JWT token if sign-in has been successful
 */
router.post('/login', (req: express.Request, res: express.Response) => {
  if (!(req.body.email || req.body.password)) {
    return res.status(401).json({message: 'Not enough information for login.'});
  }
  let email = req.body.email;
  let password = req.body.password;
  
  User.findOne({ email: email}).select('+password').exec((err, user) => {
    if (!user) {
      return res.status(401).json({message: 'user not found.'});
    }
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err || !isValid) {
        return res.status(401).json({message: 'No such user found.'});
      }
      let payload = {id: user.id};
      let token = jwt.sign(payload, JwtOptions.secretOrKey);
      return res.json({user: user, token: token});
    });
  });
});

/**
 * POST /signup
 * register a new user
 */
router.post('/signup', checkAccessToken, (req: express.Request, res: express.Response) => {
  let user = new User(req.body);
  user.save((err, doc) => {
    if (err) {
      return devError(err, res);
    }
    return res.json({user: doc});
  });
});

export default router;

function checkAccessToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  // OPEN_SIGNUP is true, then process to sign-up
  if (process.env.OPEN_SIGNUP) {
    return next();
  }
  
  // No authorization set, return 401
  if (!req.headers['authorization']) {
    return res.status(401).json({
      message: 'Open signup is disabled.'
    });
  }
  
  // Authorization ADMIN_TOKEN match, process to sign-up
  if (req.headers['authorization'] == process.env.ADMIN_TOKEN) {
    req.body.isAdmin = true;
    return next();
  }
  
  // Authorization failed
  return res.status(401).json({
    message: 'Open signup is disabled - wrong token'
  });
}
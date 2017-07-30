import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as _ from 'lodash';

import { JwtOptions } from './models/jwtoptions';
import { MockupUsers } from './models/mockupUsers';

import * as generatorController from './routes/generator.controller';
import * as homeController from './routes/home.controller';
import * as loginController from './routes/login.controller';

dotenv.config();
const JwtStrategy = passportJWT.Strategy;

const users = new MockupUsers();

const strategy = new JwtStrategy(JwtOptions, function(payload: any, next: any) {
  let user = users.findById(payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get(
  '/',
  homeController.index
);
app.post(
  '/login',
  loginController.login
);
app.get(
  '/generator/:fileId',
  passport.authenticate('jwt', {session: false}),
  generatorController.generate
);

app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'),
    app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;

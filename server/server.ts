import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';

import { JwtOptions } from './models/jwtoptions';
import { User } from './models/user';

import contactController from './routes/contacts/contact.controller';
import contractController from './routes/contracts/contract.controller';
import userController from './routes/users/user.controller';
import homeController from './routes/home/home.controller';
import tokenController from './routes/tokens/token.controller';

dotenv.config();
const JwtStrategy = passportJWT.Strategy;

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error. Please make sur MongoDB is running.');
  process.exit();
});
mongoose.connection.on('open', () => {
  console.log('MongoDB connection is open.');
});

const strategy = new JwtStrategy(JwtOptions, function(payload: any, next: any) {
  User.findOne({ _id: payload.id }, (err, user) => {
    if (err) {
      return next(null, false);
    }
    if (user) {
      return next(null, user);
    }
    return next(null, false);
  });
});
passport.use(strategy);

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
});

app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(new Date() + ' ' + req.method + ' ' + req.url);
  next();
});

app.use('/', homeController);
app.use('/contacts', contactController);
app.use('/contracts', contractController);
app.use('/users', userController);
app.use('/tokens', tokenController);

app.listen(app.get('port'), () => {
  console.log(('App is running at http://localhost:%d in %s mode'),
    app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});

module.exports = app;

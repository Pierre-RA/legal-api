import * as Mongoose from 'mongoose';
import * as hat from 'hat';

interface ITokenModel extends IToken, Mongoose.Document {}

export interface IToken {
  value: string,
  email: string,
  date: string,
}

export let tokenSchema = new Mongoose.Schema({
  value: String,
  email: String,
  date: {
    type: Date,
    default: Date.now, expires: '1d'
  },
}).pre('save', function(next) {
  this.token = hat.rack();
  return next();
});

export let Token = Mongoose.model<ITokenModel>('Token', tokenSchema);
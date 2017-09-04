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
    default: Date.now, expires: 86400
  },
}).pre('save', function(next) {
  let rack = hat.rack();
  this.value = rack();
  return next();
});

export let Token = Mongoose.model<ITokenModel>('Token', tokenSchema);
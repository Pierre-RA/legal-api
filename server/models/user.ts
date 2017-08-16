import * as Mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

interface IUserModel extends IUser, Mongoose.Document {}

const BCRYPT_ROUNDS = 13;

export interface IUser {
  name: string,
  email: string,
  password: string,
  isAdmin: boolean,
  contract: string,
}

export let userSchema = new Mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  isAdmin: Boolean,
  contract: String,
}).pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt
    .hash(this.password, BCRYPT_ROUNDS)
    .then(hash => {
      this.password = hash;
      return next();
    }).catch(err => {
      return next(err);
    });
});

export let User = Mongoose.model<IUserModel>('User', userSchema);

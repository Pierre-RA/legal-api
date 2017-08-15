import * as Mongoose from 'mongoose';

interface IUserModel extends IUser, Mongoose.Document {}

export interface IUser {
  name: string,
  password: string,
  isAdmin: boolean,
  contract: string,
}

export let userSchema = new Mongoose.Schema({
  name: String,
  password: {
    type: String,
    select: false,
  },
  isAdmin: Boolean,
  contract: String,
});

export let User = Mongoose.model<IUserModel>('User', userSchema);

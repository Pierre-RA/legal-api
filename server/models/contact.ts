import * as Mongoose from 'mongoose';

interface IContactModel extends IContact, Mongoose.Document {}

export interface IContact {
  type: String,
  email: String,
  phone: String,
  firstName: String,
  lastName: String,
  reason: String,
  isMale: Boolean,
  address: {
    line1: String,
    line2: String,
    line3: String,
    postCode: String,
    city: String,
    province: String,
    country: String
  }
};

export let contactSchema = new Mongoose.Schema({
  type: String,
  email: String,
  phone: String,
  firstName: String,
  lastName: String,
  reason: String,
  isMale: Boolean,
  address: {
    line1: String,
    line2: String,
    line3: String,
    postCode: String,
    city: String,
    province: String,
    country: String
  }
});

export let Contact = Mongoose.model<IContactModel>('Contact', contactSchema);

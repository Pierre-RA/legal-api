import * as Mongoose from 'mongoose';

interface IContactModel extends IContact, Mongoose.Document {}

export interface IContact {
  type: string,
  email: string,
  phone: {
    country: string,
    phone: string,
  },
  firstName: string,
  lastName: string,
  reason: string,
  isMale: boolean,
  address: {
    line1: string,
    line2: string,
    line3: string,
    postCode: string,
    city: string,
    province: string,
    country: string
  }
};

export let contactSchema = new Mongoose.Schema({
  type: String,
  email: String,
  phone: {
    country: String,
    phone: String,
  },
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

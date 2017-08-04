import * as Mongoose from 'mongoose';

import { Contact, IContact, contactSchema } from './contact';

interface IContractModel extends IContract, Mongoose.Document {}

export interface IContract {
  borrower: IContact,
  lender: IContact,
  type: Number,
  title: String,
  loan: {
    goal: String,
    hasGoal: Boolean,
    hasLent: Boolean,
    dateLent: Date,
    datePayOff: Date,
    currency: string,
    amount: number,
    interest: number,
    length: Date,
    amountPayoff: number,
  },
  date: Date,
  place: String,
}

let contractSchema = new Mongoose.Schema({
  borrower: contactSchema,
  lender: contactSchema,
  type: Number,
  title: String,
  loan: {
    goal: String,
    hasGoal: Boolean,
    hasLent: Boolean,
    dateLent: Date,
    datePayOff: Date,
    currency: String,
    amount: Number,
    interest: Number,
    length: Date,
    amountPayoff: Number,
  },
  date: Date,
  place: String,
});

const Contract = Mongoose.model<IContractModel>('Contract', contractSchema);
export default Contract;

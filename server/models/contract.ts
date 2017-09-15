import * as Mongoose from 'mongoose';

import { Contact, IContact, contactSchema } from './contact';

interface IContractModel extends IContract, Mongoose.Document {}

export interface IPayoff {
  date: string;
  amount: number;
}

export interface IContract {
  borrower: IContact,
  lender: IContact,
  type: number,
  title: string,
  country: string,
  canton: string,
  loan: {
    goal: string,
    hasGoal: boolean,
    hasLent: boolean,
    dateLent: string,
    currency: string,
    amount: number,
    interest: number,
    payoff: Array<IPayoff>,
    length: string,
    extendNegotiationDate: string,
    silentDate: string,
  },
  date: string,
  place: string,
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
    payoff: [{
      date: Date,
      amount: Number,
    }],
    currency: String,
    amount: Number,
    interest: Number,
    length: Date,
    extendNegotiationDate: Date,
    silentDate: Date,
  },
  date: Date,
  place: String,
  country: String,
  canton: String
});

const Contract = Mongoose.model<IContractModel>('Contract', contractSchema);
export default Contract;

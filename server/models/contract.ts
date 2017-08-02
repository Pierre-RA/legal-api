import * as Mongoose from 'mongoose';

import { Contact, IContact, contactSchema } from './contact';

interface IContractModel extends IContract, Mongoose.Document {}

export interface IContract {
  borrower: IContact,
  lender: IContact,
  type: Number,
  loan: {
    goal: String,
    hasGoal: Boolean,
    hasLent: Boolean,
    dateLent: Date,
    currency: String,
    amount: Number,
    interest: Number,
  }
}

let contractSchema = new Mongoose.Schema({
  borrower: contactSchema,
  lender: contactSchema,
  loan: {
    goal: String,
    hasGoal: Boolean,
    hasLent: Boolean,
    dateLent: Date,
    currency: String,
    amount: Number,
    interest: Number,
  }
});

const Contract = Mongoose.model<IContractModel>('Contract', contractSchema);
export default Contract;

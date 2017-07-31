import * as Mongoose from 'mongoose';

import Contact from './contact';

interface IContractModel extends Mongoose.Document {}

let contractSchema = new Mongoose.Schema({
  borrower: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  },
  lender: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  },
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

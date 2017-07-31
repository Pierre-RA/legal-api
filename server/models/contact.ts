import * as Mongoose from 'mongoose';

interface IContactModel extends Mongoose.Document {}

let contactSchema = new Mongoose.Schema({
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

const Contact = Mongoose.model<IContactModel>('Contact', contactSchema);
export default Contact;

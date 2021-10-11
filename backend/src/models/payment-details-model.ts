import { Schema, model } from "mongoose";

export interface IPaymentDetails {
  user_id: string;
  payment_id: string;
  payment_request_id: string;
  amount: string;
}

const PaymentDetailsSchema: Schema = new Schema({
  user_id: {
    type: String,
  },
  payment_id: {
    type: String,
  },
  payment_request_id: {
    type: String,
  },
  amount: { type: String },
});

export default model<IPaymentDetails>("PaymentDetails", PaymentDetailsSchema);

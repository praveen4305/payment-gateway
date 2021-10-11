import { Request, Response } from "express";
const Insta = require("instamojo-nodejs");
import PaymentDetailsModel, {
  IPaymentDetails,
} from "../models/payment-details-model";

interface paymentData {
  purpose: string;
  amount: number;
  buyer_name: string;
  redirect_url: string;
  email: string;
  phone: string;
  send_email: boolean;
  webhook: string;
  send_sms: boolean;
  allow_repeated_payments: boolean;
}

export class Payments {
  public index = (req: Request, res: Response) => {
    res.send("hello, express");
  };

  public paymentRequest = (req: Request, res: Response) => {
    Insta.setKeys(
      "test_f6fc4accaa5f19bb18d6b7419fa",
      "test_955d1fc981f4fc430931a07a125"
    );
    const data: paymentData = new Insta.PaymentData();
    Insta.isSandboxMode(true);
    console.log("req.body", req.body);
    data.purpose = req.body.purpose;
    data.amount = req.body.amount;
    data.buyer_name = req.body.buyer_name;
    data.redirect_url = req.body.redirect_url;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.send_email = false;
    data.webhook = req.body.webhook_url;
    data.send_sms = false;
    data.allow_repeated_payments = true;

    Insta.createPayment(data, function (error: any, response: string) {
      if (error) {
        console.log("payment failed");
        res.status(400).json(response);
      } else {
        // Payment redirection link at response.payment_request.longurl
        const respData = JSON.parse(response);
        const payment_request_id = respData.payment_request.id;
        const redirect_url = respData.payment_request.longurl;
        //console.log("redirect_url ", redirect_url);
        console.log("response ", response);
        res.status(200).json(redirect_url);
      }
    });
  };

  public callback = async (req: Request, res: Response) => {
    console.log("callback called ", req.query);
    const respData: any = req.query;
    console.log("respData ", respData);
    if (respData.payment_status != "Failed") {

      Insta.getPaymentDetails(
        respData.payment_request_id,
        respData.payment_id,
        async function (error: any, response: any) {
          if (error) {
            console.log(error);
          } else {
            console.log("getPaymentDetails", response);
            if (response["payment_request"].payment.amount) {
              const newPayment: IPaymentDetails = {
                user_id: respData.user_id,
                payment_id: respData.payment_id,
                payment_request_id: respData.payment_request_id,
                amount: response["payment_request"].payment.amount,
              };

              console.log("newPayment", newPayment);
              const newPaymentModel = new PaymentDetailsModel(newPayment);
              try {
                const savedData = await newPaymentModel.save();
                console.log("savedData", savedData);
                return res.redirect("http://localhost:3000/#/payment-complete");
              } catch (err) {
                console.log("error ", err);
              }
            }
          }
        }
      );
    } else {
      return res.redirect("http://localhost:3000/#/payment-failed");
    }
  };

  public refund = async (req: Request, res: Response) => {
    const findResult = await PaymentDetailsModel.findOne({
      payment_id: req.body.payment_id,
    });
    console.log("findResult", findResult);
    if (findResult) {
      var refund = new Insta.RefundRequest();
      refund.payment_id = req.body.payment_id;
      refund.type = req.body.type;
      refund.body = req.body.body;
      refund.setRefundAmount(findResult.amount);
      console.log("refund", refund);

      const refundResp = await Insta.createRefund(refund);
      console.log("refundResp", refundResp);
    } else {
      res.status(404).json({ message: "payment id does not exists" });
    }
  };
}

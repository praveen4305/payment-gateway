import React from "react";
import axios from "axios";

const valuesForTypeParam = {
  RFD: "Duplicate/delayed payment",
  TNR: "Product/service no longer available",
  QFL: "Customer not satisfied",
  QNR: "Product lost/damaged",
  EWN: "Digital download issue",
  TAN: "Event was canceled/changed",
  PTH: "Problem not described above"
};

class Payment extends React.Component {
  onClickBuy = async () => {
    console.log("onClickBuy");
    const user = {
      id: 1,
      name: "john",
      email: "john@example.com",
      phone: "9655423123",
    };
    const data = {
      purpose: "buying phone",
      amount: 50000,
      buyer_name: user.name,
      email: user.email,
      phone: user.phone,
      user_id: user.id,
      redirect_url: `http://localhost:8080/api/callback?user_id=${user.id}`,
      webhook_url: "http://f2ad-49-204-69-42.ngrok.io/webhook",
    };
    // 4323 2131 9123 2132
    const response = await axios.post(
      "http://localhost:8080/api/payment-request",
      data
    );
    console.log("line 25 in payment", response);
    window.location.href = response.data;
  };

  onClickRefund = async () => {
    console.log("onClickRefund");
    const typeParamValue = "Product lost/damaged";
    let typeValue; 
    Object.keys(valuesForTypeParam).forEach(key => {
      if(valuesForTypeParam[key] === typeParamValue) {
        typeValue = key;
      }
    });
    const refundData = {
      payment_id: "MOJO1a10W05N39178756",
      type: typeValue,
      body: "Damaged product is delivered",
    };
    const response = await axios.post("http://localhost:8080/api/refund", refundData);
    console.log("refund response", response);
  };

  render() {
    return (
      <div>
        <button onClick={this.onClickBuy}>buy now</button>
        <button onClick={this.onClickRefund}>click for refund</button>
      </div>
    );
  }
}

export default Payment;

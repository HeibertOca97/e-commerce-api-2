const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': process.env.PAYPAL_MODE,
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

const setOrderData = (items, amount, description) => {
  return {
    intent: "SALE", // SALE, AUTHORIZE, ORDER, NONE
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: "http://localhost:3000/execute-payment",
      cancel_url: "http://localhost:3000/cancel-payment"
    },
    transactions: [{
      item_list: {
        items: items
      },
      amount: amount,
      description: description
    }]
  };
}

const createOrder = (createdPayment, res) => {
  paypal.payment.create(createdPayment, function (err, payment) {
    if (err) {
      res.status(400).json(err);
    } else {
      console.log("Create order");
      //console.log(payment);
      res.status(201).json(payment);
    }
  });
}

const getCreatedOrder = (payerId, amount, description) => {
  return {
    payer_id: payerId,
    transactions: [{ 
      amount: amount,
      description: description
    }]
  }
}
const executePayment = (paymentId, capturePayment, res) => {
  paypal.payment.execute(paymentId, capturePayment, function (error, payment) {
    if (error) {
        console.log(error.response);
      res.status(400).json(err);
    } else {
        console.log("Get Payment Response");
        console.log(payment);
      res.status(201).json(payment);
    }
});
}

module.exports = {
  setOrderData,
  createOrder,
  getCreatedOrder,
  executePayment
}

const { 
  setOrderData,
  createOrder,
  getCreatedOrder,
  executePayment
} = require("../libs/paypal");

const createAndGenerateOrder = (req, res) => {
  try{
    const {items, amount, description} = req.body;
    const data = setOrderData(items, amount, description);
    createOrder(data, res);
    
  }catch(err){
    res.status(500).json(err);
  }
}

const captureAndStoringOrder = (req, res) => {  
  try{
    const payerId = req.params.payerID;
    const paymentId = req.params.paymentId;
    //const {amount, description} = req.body;
    const data = getCreatedOrder(payerId, {
        currency: "USD",
        total: "130.00"
    }, "This is the payment description.");
    executePayment(paymentId, data, res);
   console.log(payerId) 
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports = {
  createAndGenerateOrder,
  captureAndStoringOrder
}

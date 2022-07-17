const router = require('express').Router();
const { createAndGenerateOrder, captureAndStoringOrder } = require('../controllers/PaymentController')

router.post('/orders', createAndGenerateOrder);
router.get('/orders/:paymentId/:payerID/capture', captureAndStoringOrder);


module.exports = router;

const router = require('express').Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../middlewares/auth.middleware'); 
const {
  store,
  update,
  destroy,
  showUserOrder,
  showMonthlyIncome,
  index
} = require('../controllers/OrderController');


router.get('/', verifyTokenAndAdmin, index);
router.get('/find/:userId', verifyTokenAndAuthorization, showUserOrder);
router.get('/income', verifyTokenAndAdmin, showMonthlyIncome);
router.post('/', verifyToken, store);
router.put('/:id', verifyTokenAndAdmin, update);
router.delete('/:id', verifyTokenAndAdmin, destroy);


module.exports = router;

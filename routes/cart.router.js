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
  showUserCart,
  index
} = require('../controllers/CartController');


router.get('/', verifyTokenAndAdmin, index);
router.get('/find/:userId', verifyTokenAndAuthorization, showUserCart);
router.post('/', verifyToken, store);
router.put('/:id', verifyTokenAndAuthorization, update);
router.delete('/:id', verifyTokenAndAuthorization, destroy);


module.exports = router;


const router = require('express').Router();
const {
  verifyTokenAndAdmin
} = require('../middlewares/auth.middleware'); 
const {
  index,
  store,
  update,
  destroy,
  show
} = require('../controllers/ProductController');


router.get('/', index);
router.get('/find/:id', show);
router.post('/', verifyTokenAndAdmin, store);
router.put('/:id', verifyTokenAndAdmin, update);
router.delete('/:id', verifyTokenAndAdmin, destroy);


module.exports = router;


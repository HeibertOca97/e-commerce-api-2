const router = require('express').Router();
const {
  verifyTokenAndAdmin
} = require('../middlewares/auth.middleware'); 
const {
  getAll,
  addProduct,
  updateProduct,
  deleteProduct,
  findProduct
} = require('../controllers/ProductController');


router.get('/', getAll);
router.get('/find/:id', findProduct);
router.post('/', verifyTokenAndAdmin, addProduct);
router.put('/:id', verifyTokenAndAdmin, updateProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);


module.exports = router;


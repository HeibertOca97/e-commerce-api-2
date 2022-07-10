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
const {uploadProductImage} = require('../libs/storage.multer');

router.get('/', index);
router.get('/find/:id', show);
router.post('/', [verifyTokenAndAdmin, uploadProductImage], store);
router.put('/:id', [verifyTokenAndAdmin, uploadProductImage], update);
router.delete('/:id', verifyTokenAndAdmin, destroy);


module.exports = router;


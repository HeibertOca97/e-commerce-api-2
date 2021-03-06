const router = require('express').Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../middlewares/auth.middleware'); 
const {
  index,
  update,
  destroy,
  show,
  getStats,
} = require('../controllers/UserController');


router.get('/', verifyTokenAndAdmin, index);
router.get('/find/:id', verifyTokenAndAdmin, show);
router.get('/stats', verifyTokenAndAdmin, getStats);
router.put('/:id', verifyTokenAndAuthorization, update);
router.delete('/:id', verifyTokenAndAuthorization, destroy);


module.exports = router;


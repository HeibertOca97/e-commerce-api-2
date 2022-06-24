const router = require('express').Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../middlewares/auth.middleware'); 
const {
  getAll,
  updateUser,
  deleteUser,
  findUser,
  getStats
} = require('../controllers/UserController');


router.get('/', verifyTokenAndAdmin, getAll);
router.get('/find/:id', verifyTokenAndAdmin, findUser);
router.get('/stats', verifyTokenAndAdmin, getStats);
router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);


module.exports = router;


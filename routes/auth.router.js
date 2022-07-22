const router = require('express').Router();
const {loginRequest, registerRequest} = require('../requests/auth.request');
const { verifyRefreshToken, verifyToken } = require('../middlewares/auth.middleware');
const { login, register, refreshToken, logout } = require('../controllers/AuthController')

router.post('/register', registerRequest, register);
router.post('/login', loginRequest, login);
router.post('/refresh', verifyRefreshToken, refreshToken);
router.post('/logout', verifyToken, logout);

module.exports = router;

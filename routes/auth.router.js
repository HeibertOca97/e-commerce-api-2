const router = require('express').Router();
const {loginRequest, registerRequest} = require('../requests/auth.request');
const { login, register, refreshToken } = require('../controllers/AuthController')

router.post('/register', registerRequest, register);
router.post('/login', loginRequest, login);
router.post('/refresh', loginRequest, login);

module.exports = router;

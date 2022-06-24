const router = require('express').Router();
const {loginRequest, registerRequest} = require('../requests/auth.request');
const { login, register } = require('../controllers/AuthController')

router.post('/register', registerRequest, register);

router.post('/login', loginRequest, login);

module.exports = router;

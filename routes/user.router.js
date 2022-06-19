const express = require('express');
const router = express.Router();
const {
  getAll,
  addUser
} = require('../controllers/UserController');


router.get('/users', getAll);
router.post('/users', addUser);


module.exports = router;

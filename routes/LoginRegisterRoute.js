const express = require('express');
const userController = require('../controllers/User');

const router = express.Router();

router.post('/login', userController.login);

router.post('/user', userController.signUp);

module.exports = router;
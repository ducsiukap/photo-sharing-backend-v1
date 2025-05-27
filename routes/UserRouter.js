const express = require('express');

const userController = require('../controllers/User');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// get all user
router.get('/list', verifyToken, userController.getAllUser);

// get user by id
router.get('/:id', verifyToken, userController.getOneUserById);

module.exports = router;
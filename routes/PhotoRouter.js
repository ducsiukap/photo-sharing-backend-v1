const express = require('express');
const photoController = require('../controllers/Photo');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/photosOfUser/:id', verifyToken, photoController.getPhotosOfUser);

router.get('/commentsOfUser/:id', verifyToken, photoController.getCommentByUserId)

module.exports = router;
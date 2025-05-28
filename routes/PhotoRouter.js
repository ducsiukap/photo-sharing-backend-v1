const express = require('express');
const photoController = require('../controllers/Photo');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploadImage');

const router = express.Router();

router.get('/photosOfUser/:id', verifyToken, photoController.getPhotosOfUser);

router.get('/commentsOfUser/:id', verifyToken, photoController.getCommentByUserId)

router.post('/commentsOfPhoto/:id', verifyToken, photoController.postNewComment);


router.post('/new', verifyToken, upload.single('image'), photoController.postNewPhoto);

module.exports = router;
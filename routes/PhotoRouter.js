const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("photo hello!");
})

module.exports = router;
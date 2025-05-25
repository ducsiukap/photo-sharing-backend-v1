const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/UserRouter');
const photoRouter = require('./routes/PhotoRouter');

const app = express();

// milldleware
app.use(cors());
app.use(express.json()); // body-parser

// static files
app.use('/images', express.static('public/images'));


// routes
app.get('/', (req, res) => {
    res.send('Hello from vduczz!');
})
// user route
app.use('/api/user', userRouter);
// photo route
app.use('/api/photo', photoRouter);


// export app
module.exports = app;
import express from 'express';
import cors from 'cors';

const app = express();

// milldleware
app.use(cors());
app.use(express.json()); // body-parser

// routes
app.get('/', (req, res) => {
    res.send('Hello from vduczz!');
})

// static files
app.use('/images', express.static('public/images'));

// export app
export default app;
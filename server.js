const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 1303;
const HOST = process.env.HOST || 'localhost';
app.use(cors());
app.use(express.json()); // body-parser

// app.METHOD(PATH, HANDLER)
app.get('/', (req, res) => {
    res.send('Backend webserver - vduczz');
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

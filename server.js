import app from './app.js';
import dotenv from 'dotenv';

// config .env
dotenv.config();

// read from .env = process.env.VARIABLE_NAME
const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME || 'localhost';

// start the server
app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
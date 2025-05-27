const app = require('./app');
require('dotenv').config();
const connectDB = require('./config/configDatabase');


// read from .env = process.env.VARIABLE_NAME
const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME || 'localhost';


// run the server only if connect to the db successfully
(async () => {
    try {
        // connect to db
        await connectDB();

        // start the server
        app.listen(port, hostname, () => {
            console.log(`Server is running on http://${hostname}:${port}`);
        });
    } catch (err) {
        console.log('>>> Error when connect to db: ', err)
    };
})();  // auto-invoking function (auto call after difinition)

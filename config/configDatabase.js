const mongoose = require('mongoose');
require('dotenv').config();

var dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value == state).label, "to db");
    } catch (err) {
        console.log('>>> Error database connection: ', err);
    }
};

module.exports = connectDB;
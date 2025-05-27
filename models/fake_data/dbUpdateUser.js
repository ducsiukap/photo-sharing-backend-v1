const User = require('../User');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);
async function updateUser() {
    const users = await User.find();

    for (let user of users) {
        const username = `${user.first_name}${user.last_name}`.toLowerCase();
        const password = '12345678';
        await User.updateOne({ _id: user._id }, { username: username, password: password });
    }
    mongoose.disconnect();
}

updateUser();
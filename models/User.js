const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    location: { type: String },
    description: { type: String },
    occupation: { type: String },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
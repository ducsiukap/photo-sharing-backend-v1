const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    location: {type: String},
    description: {type: String}, 
    occupation: {type: String}
});

userSchema.virtual('full_name')
    .get(() => {first_name + ' ' + last_name});

const User = mongoose.model('User', userSchema);

module.exports = User;
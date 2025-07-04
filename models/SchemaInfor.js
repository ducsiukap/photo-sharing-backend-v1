const mongoose = require('mongoose');

const schemaInfor = new mongoose.Schema({
    version: String,
    load_date_time: { type: Date, default: Date.now }
});

const SchemaInfo = mongoose.model('SchemaInfo', schemaInfor);

module.exports = SchemaInfo;
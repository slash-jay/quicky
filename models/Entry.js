const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    data: { type: String, required: true }
});

module.exports = mongoose.model('Entry', entrySchema);

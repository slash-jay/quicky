const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 1000000000 // 1 billion characters
    }
});

module.exports = mongoose.model('Entry', entrySchema);

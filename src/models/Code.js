const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Code', CodeSchema);

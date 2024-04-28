const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    book_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    request: {
        type: String,
        default : "pending"
    }
});

const Requests = mongoose.model('Requests', requestSchema);

module.exports = Requests;

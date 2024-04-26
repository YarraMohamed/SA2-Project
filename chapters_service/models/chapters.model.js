const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        minlength: 7
    },
    book_id: {
        type: String,
        required: true
    }
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;

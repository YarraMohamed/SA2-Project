const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,

        },
        description:
        {
            type: String,
            default: ''
        },
        author:
        {
            type: String,
            default: ''
        },
        field:
        {
            type: String,
            default: ''
        },
        publicationDate:
        {
            type: Date,
            default: '',
            required: true

        },
        pdfFile:
        {
            type: String,
            default: '',
            required: true,
        },
        imageUrl: {
            type: String,
            default: '',
            required: true,

        }

    }
)
module.exports = mongoose.model("Lesson", bookSchema)
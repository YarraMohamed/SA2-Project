const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['1', '0'],
        default: '0'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

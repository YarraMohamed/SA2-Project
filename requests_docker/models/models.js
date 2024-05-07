const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    book_name : {
        type : String,
        required : true
    },
    user_name:{
        type:String,
        required : true
    },
    request: {
        type: String,
        default : "pending"
    }
});

const Requests = mongoose.model('Requests', requestSchema);

module.exports = Requests;

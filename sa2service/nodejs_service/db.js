const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://books_db:27017/books_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to mongoDB')
    } catch (err) {
        console.log(err.message);
    }
}
module.exports = connectDB;
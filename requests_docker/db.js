const mongoose = require("mongoose");

mongoose
  .connect("mongodb://requests_db:27017/requestsdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const RequestsDB = mongoose.connection;

module.exports = RequestsDB;

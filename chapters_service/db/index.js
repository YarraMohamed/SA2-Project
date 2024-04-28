const mongoose = require("mongoose");

mongoose
  .connect("mongodb://chapters_db:27017/chaptersdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const DBconnection = mongoose.connection;

module.exports = DBconnection;

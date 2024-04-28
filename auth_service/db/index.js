const mongoose = require("mongoose");

mongoose
  .connect("mongodb://auth_db:27017/authdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
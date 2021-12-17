const { connect } = require("http2");
const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  mongoose.connect(process.env.MONGO_URL);
  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("DB connection successful");
  });

  connection.on("error", () => {
    console.log("Something went wrong in DB connection");
  });
}

connectDB();

module.exports = mongoose;

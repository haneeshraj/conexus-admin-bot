const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/testDB");
    console.log(
      `MongoDB connected to port : ${conn.connection.host.bgYellow}`.blue
    );
  } catch (error) {
    console.error(`Error : ${error}`);
  }
};

module.exports = connectDB;

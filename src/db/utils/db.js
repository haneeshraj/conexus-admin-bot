require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected to port : ${conn.connection.host.bgYellow}`.blue
    );
  } catch (error) {
    console.error(`Error : ${error}`);
  }
};

module.exports = connectDB;

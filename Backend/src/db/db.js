const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database Connected Successfully");
}

module.exports = connectDB;
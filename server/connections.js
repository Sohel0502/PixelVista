const mongoose = require("mongoose");

const connectDb = async (req, res)=> {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  if(connection.STATES.connected) return console.log("Database is connected");
  if(connection.STATES.disconnected) return console.log("Database is disconnected");

};
module.exports = {connectDb}
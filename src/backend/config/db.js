// db.js

const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://root:tutorME2021@cluster0.i7ajg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  console.log(`Attempting to connect to: ${mongoURI}`);
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// db.js
const config = require('./config');
const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = config.mongoURI;
    console.log(`Attempting to connect to: ${mongoURI}`);
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true
        });

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

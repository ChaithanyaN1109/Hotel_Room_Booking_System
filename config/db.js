
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables at the top
console.log('Outside Try:', process.env.MONGO_URI);

const connectDB = async () => {
    try {
        // Check if MONGO_URI exists
        const url = process.env.MONGO_URI;
        if (!url) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }

        console.log(`Connecting to MongoDB with URI: ${url}`); // Debugging log

        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
       

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};
//function call
//connectDB().catch(console.error);
module.exports = connectDB;
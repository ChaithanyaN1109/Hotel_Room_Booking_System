const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // db connection file
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/booking", bookingRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to Hotel Booking API 🏨");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
module.exports = app;
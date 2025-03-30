const mongoose = require("mongoose");
const Room = require("./models/room"); // Adjust the path as per your structure

mongoose.connect("mongodb://localhost:27017/hotel_booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedRooms = async () => {
  try {
   await Room.deleteMany(); // Clear old data
    await Room.insertMany([
      { roomNumber: 101, type: "Single", status: "Available" },
      { roomNumber: 102, type: "Single", status: "Available" },
      { roomNumber: 201, type: "Double", status: "Available" },
      { roomNumber: 202, type: "Double", status: "Available" },
      { roomNumber: 301, type: "Suite", status: "Available" }
    ]);
   
    console.log("✅ Room data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting room data:", error);
  }
};

seedRooms();




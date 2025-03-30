// Adjust the path as necessar
const mongoose = require("mongoose");
const Room = require("./models/room");

mongoose.connect("mongodb://localhost:27017/hotel_booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany(); // Clear old rooms

    await Room.insertMany([
      { roomNumber: 101, type: "Single", capacity: 1, status: "Available" },
      { roomNumber: 102, type: "Double", capacity: 2, status: "Available" },
      { roomNumber: 201, type: "Suite", capacity: 4, status: "Available" },
    ]);

    console.log("Rooms seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding rooms:", error);
    mongoose.connection.close();
  }
};

seedRooms();

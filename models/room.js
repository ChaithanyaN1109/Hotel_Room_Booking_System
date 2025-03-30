const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  type: { type: String, enum: ["Single", "Double", "Suite"], required: true },
  capacity: { type: Number, required: true },  // Max number of guests
  status: { type: String, enum: ["Available", "Booked"], default: "Available" },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

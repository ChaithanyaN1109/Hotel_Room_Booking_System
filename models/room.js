const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  type: { type: String, enum: ["Single", "Double", "Suite"], required: true },
  status: { type: String, enum: ["Available", "Booked"], default: "Available" }, // Ensure consistency
});

//const Room = mongoose.model("Room", roomSchema);
//module.exports = Room;
module.exports = mongoose.model("Room", roomSchema);


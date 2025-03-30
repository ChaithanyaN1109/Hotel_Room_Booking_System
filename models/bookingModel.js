const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: false,
    match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Invalid email format!"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Invalid phone number!"],
  },
  checkInDate: { type: Date, required: true },
  checkOutDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.checkInDate;
      },
      message: "Check-out date must be after check-in date!",
    },
  },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true }, // Reference to Room
  roomNumber: { type: Number, required: true }, // Store room number for easy access
  type: { type: String, enum: ["Single", "Double", "Suite"], required: true }, // Store room type for easy access
  status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

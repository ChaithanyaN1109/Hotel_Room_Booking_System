const Room = require("../models/room");
const Booking = require("../models/bookingModel");
const room = require("../models/room");

console.log("roomdata", Room);
const bookRoom = async (req, res) => {
  try {
    console.log("Inside booking API");
    const { guestName, email, phone, checkInDate, checkOutDate, numberOfGuests } = req.body;

    if (!guestName || !email || !phone || !checkInDate || !checkOutDate || !numberOfGuests) {
      return res.status(400).json({ message: "All fields are required, including number of guests." });
    }

    let requiredType = "";
    if (numberOfGuests === 1) requiredType = "Single";
    else if (numberOfGuests === 2) requiredType = "Double";
    else requiredType = "Suite"; // For 3+ guests

    // Find the best-matching room type
    let availableRoom = await Room.findOne({ type: requiredType, status: "Available" });

    // If no exact match is found, upgrade to the next available room type
    if (!availableRoom && requiredType === "Single") {
      availableRoom = await Room.findOne({ type: "Double", status: "Available" }) ||
                      await Room.findOne({ type: "Suite", status: "Available" });
    } else if (!availableRoom && requiredType === "Double") {
      availableRoom = await Room.findOne({ type: "Suite", status: "Available" });
    }

    if (!availableRoom) {
      return res.status(400).json({ message: "No suitable rooms available at the moment" });
    }
    // Create a new booking
    const newBooking = new Booking({
      guestName,
      email,
      phone,
      checkInDate,
      checkOutDate,
      room: availableRoom._id,
      roomNumber: availableRoom.roomNumber,
      type:requiredType,
      capacity:numberOfGuests,
      status: "Booked",
    });

    // Save booking and update room status
    await newBooking.save();
    availableRoom.status = "Booked";
    await availableRoom.save();

    return res.status(201).json({
      message: "Room booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getBookingDetails = async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Email received:", email);
    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Convert email to lowercase for case-insensitive matching
    const bookings = await Booking.find({ email: email.toLowerCase() });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this email" });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings)
      return res.status(404).json({ message: "No bookings found" });
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { email, roomNumber } = req.body;
    if (!email || !roomNumber) {
      return res
        .status(400)
        .json({ message: "Email and room number are required" });
    }

    const CancelledBooking = await Booking.findOneAndDelete({
      email: email,
      roomNumber: roomNumber,
    });
    if (!CancelledBooking) {
      return res
        .status(404)
        .json({ message: "No booking found with this email and room number" });
    }
    await Room.updateOne({ roomNumber }, { status: "Available" });
    return res
      .status(200)
      .json({ message: "Booking cancelled successfully", CancelledBooking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const {name, email, roomNumber, checkInDate, checkOutDate } = req.body;
    if (!email || !roomNumber || !checkInDate || !checkOutDate) {
      return res
        .status(400)
        .json({
          message:
            "Email, room number, check-in date and check-out date are required",
        });
    }
    const updatedBooking = await Booking.findOneAndUpdate(
      { email: email, roomNumber: roomNumber },
      { checkInDate, checkOutDate },
      { new: true }
    );
    
    if (!updatedBooking) {
      return res
        .status(404)
        .json({ message: "No booking found with this email and room number" });
    }
    return res
      .status(200)
      .json({ message: "Booking updated successfully", updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { bookRoom, getBookingDetails, getAllBookings, cancelBooking , updateBooking };

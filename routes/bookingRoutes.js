const express = require("express");
const router = express.Router();
const {
  bookRoom,
  getBookingDetails,
  getAllBookings,
  cancelBooking,
  updateBooking,
} = require("../controllers/bookingController");
const {validateBooking, validateUpdateBooking} = require("../middlewares/validateBooking");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

console.log("In Router");
router.post("/book", authMiddleware, validateBooking, bookRoom);
router.get("/bookingDetails/:email", authMiddleware, getBookingDetails);
router.get("/getAllBookings", authMiddleware, adminMiddleware, getAllBookings);
router.delete("/cancelBooking", authMiddleware, cancelBooking);
router.put("/updateBooking", authMiddleware, validateUpdateBooking, updateBooking);

module.exports = router;

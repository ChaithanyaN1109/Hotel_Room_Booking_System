const express = require('express')
const router = express.Router()
const {bookRoom,getBookingDetails,getAllBookings,cancelBooking, updateBooking} = require("../controllers/bookingController")

console.log("In Router")
router.post("/book", bookRoom)
router.get("/bookingDetails/:email", getBookingDetails)
router.get("/getAllBookings", getAllBookings)
router.delete("/cancelBooking", cancelBooking)
router.put("/updateBooking", updateBooking)


module .exports = router
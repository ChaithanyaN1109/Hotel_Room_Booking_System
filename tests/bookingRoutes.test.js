const request = require("supertest");
const app = require("../server"); // Ensure this points to your Express app
const Booking = require("../models/bookingModel");
const Room = require("../models/room");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Room.deleteMany({});
  await Booking.deleteMany({});
  await Room.create({
    roomNumber: 101,
    type: "Single",
    capacity: 1,
    status: "Available",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Booking API with Authentication", () => {
  let userToken, adminToken;

  beforeAll(async () => {
    // Mock authentication tokens (Replace with actual auth logic)
    adminToken = jwt.sign(
      { id: "admin", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    userToken = jwt.sign(
      { id: "user123", role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  it("should create a new booking with valid user token", async () => {
    const res = await request(app)
      .post("/api/booking/book")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        guestName: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        checkInDate: "2025-04-01",
        checkOutDate: "2025-04-05",
        numberOfGuests: 1,
      });

    console.log(res.body); // Log response for debugging

    expect(res.status).toBe(201);
    expect(res.body.booking).toHaveProperty("_id");
  });

  it("should allow admin to fetch all bookings", async () => {
    const res = await request(app)
      .get("/api/booking/getAllBookings")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should deny non-admin user from fetching all bookings", async () => {
    const res = await request(app)
      .get("/api/booking/getAllBookings")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  it("should allow user to update their booking", async () => {
    const res = await request(app)
      .put("/api/booking/updateBooking")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        email: "john@example.com",
        roomNumber: 101,
        checkInDate: "2025-04-02",
        checkOutDate: "2025-04-06",
      });
      console.log(res.body); // Log response for debugging
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Booking updated successfully");
  });

  it("should allow user to cancel their booking", async () => {
    const res = await request(app)
      .delete("/api/booking/cancelBooking")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ email: "john@example.com", roomNumber: 101 });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Booking cancelled successfully");
  });
});

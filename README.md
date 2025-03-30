# Hotel Room Booking System

## Overview
This project is a **Hotel Room Booking System** built using **Node.js, Express, and MongoDB**. It allows guests to book rooms based on availability, cancel bookings, and retrieve booking details. Admins can manage bookings with authentication.

## Features
- **User Authentication:** JWT-based authentication for secure access.
- **Room Booking:** Guests can book rooms based on availability and number of guests.
- **View Bookings:** Users can view their bookings.
- **Cancel Bookings:** Users can cancel their room bookings.
- **Admin Access:** Only admins can view all bookings.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Joi
- **Testing:** Jest & Supertest

## Installation
### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [MongoDB](https://www.mongodb.com/)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/hotel-booking.git
   cd hotel-booking
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```sh
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login to get a token

### Booking
- `POST /api/booking/book` - Book a room
- `GET /api/booking/:email` - Get user bookings
- `DELETE /api/booking/cancelBooking` - Cancel a booking
- `PUT /api/booking/updateBooking` - Update booking details

### Admin
- `GET /api/booking/getAllBookings` - Get all bookings (Admin only)

## Testing
Run unit tests using Jest:
```sh
npm test
```

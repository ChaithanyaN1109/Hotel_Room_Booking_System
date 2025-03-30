const Joi = require("joi");

const bookingSchema = Joi.object({
  guestName: Joi.string().min(2).required(),
  email: Joi.string()
    .pattern(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)
    .required(),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required(), // 10-digit phone number
  checkInDate: Joi.date().greater("now").required(), // Must be in future
  checkOutDate: Joi.date().greater(Joi.ref("checkInDate")).required(), // After check-in
  numberOfGuests: Joi.number().integer().min(1).required(),
});

const updateBookingSchema = Joi.object({
  guestName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  checkInDate: Joi.date().optional(),
  checkOutDate: Joi.date().optional(),
  numberOfGuests: Joi.number().integer().min(1).optional(),
  roomNumber: Joi.number().integer().positive().optional(), // ✅ Allow roomNumber in updates
}).min(1);

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

const validateUpdateBooking = (req, res, next) => {
  const { error } = updateBookingSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = { validateBooking, validateUpdateBooking };

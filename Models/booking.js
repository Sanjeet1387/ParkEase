const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  parkingspot: {
    type: Schema.Types.ObjectId,
    ref: "ParkingSpot",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
  type: String,
  required: true,
 },
  endTime: {
    type: String,
    required: true,
  },
  hours: Number,

  pricePerHour: Number,
  totalPrice: Number,

  paymentMethod: {
    type: String,
    enum: ["upi", "card", "cash"],
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },

  bookingStatus: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
  qrCode: {
  type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
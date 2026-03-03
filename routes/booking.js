const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const Booking = require("../Models/booking");
const ParkingSpot = require("../Models/parkingspot");
// const sendBookingEmail = require("../utils/sendEmail");
const QRCode = require("qrcode");

// SHOW BOOKING FORM
router.get("/parkingspots/:id/book", isLoggedIn, async (req, res) => {
  const parkingspot = await ParkingSpot.findById(req.params.id);

  if (!parkingspot) {
    req.flash("failure", "Parking spot not found");
    return res.redirect("/parkingspots");
  }

  res.render("bookings/new.ejs", { parkingspot });
});

// CREATE BOOKING
router.post("/parkingspots/:id/book", isLoggedIn, async (req, res) => {
  const { date, startTime, endTime, paymentMethod } = req.body;

  if (!date || !startTime || !endTime || !paymentMethod) {
    req.flash("failure", "Invalid booking details");
    return res.redirect(`/parkingspots/${req.params.id}/book`);
  }

  if (startTime >= endTime) {
    req.flash("failure", "End time must be after start time");
    return res.redirect(`/parkingspots/${req.params.id}/book`);
  }

  const parkingspot = await ParkingSpot.findById(req.params.id);

  // Correct overlap check
  const overlappingBooking = await Booking.findOne({
    parkingspot: parkingspot._id,
    date,
    bookingStatus: "confirmed",
    $expr: {
      $and: [
        { $lt: ["$startTime", endTime] },
        { $gt: ["$endTime", startTime] },
      ],
    },
  });

  if (overlappingBooking) {
    req.flash("failure", "Time slot already booked.Please try later!");
    return res.redirect(`/parkingspots/${req.params.id}/book`);
  }

  const hours =
    (parseInt(endTime.split(":")[0]) * 60 +
      parseInt(endTime.split(":")[1]) -
      (parseInt(startTime.split(":")[0]) * 60 +
        parseInt(startTime.split(":")[1]))) /
    60;

  const totalPrice = hours * parkingspot.price;

  const booking = new Booking({
    parkingspot: parkingspot._id,
    user: req.user._id,
    date,
    startTime,
    endTime,
    hours,
    pricePerHour: parkingspot.price,
    totalPrice,
    paymentMethod,
    paymentStatus: "paid",
    bookingStatus: "confirmed",
  });

   await booking.save(); // SAVE

    // Generate QR AFTER save
    const QRCode = require("qrcode");
    const qrData = `BookingID:${booking._id}`;
    const qrImage = await QRCode.toDataURL(qrData);

    booking.qrCode = qrImage;
    await booking.save(); //SAVE Again after generating QR code


  req.flash("success", "Booking Confirmed!");
  res.redirect(`/bookings/${booking._id}`);
});

// SHOW BOOKING CONFIRMATION
router.get("/bookings/:id", isLoggedIn, async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("parkingspot")
    .populate("user");

  if (!booking) {
    req.flash("failure", "Booking not found");
    return res.redirect("/parkingspots");
  }

  res.render("bookings/show.ejs", { booking });
});

// USER BOOKING HISTORY
router.get("/bookings", isLoggedIn, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("parkingspot")
    .sort({ createdAt: -1 });

  res.render("bookings/index.ejs", { bookings });
});

// CANCEL BOOKING
router.post("/bookings/:id/cancel", isLoggedIn, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking || !booking.user.equals(req.user._id)) {
    req.flash("failure", "Unauthorized action");
    return res.redirect("/bookings");
  }

  booking.bookingStatus = "cancelled";
  await booking.save();

  req.flash("success", "Booking cancelled successfully");
  res.redirect("/bookings");
});

// OWNER BOOKINGS DASHBOARD
router.get("/owner/bookings", isLoggedIn, async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: "parkingspot",
      match: { owner: req.user._id },
    })
    .populate("user");

  const ownerBookings = bookings.filter(b => b.parkingspot);

  res.render("bookings/owner.ejs", { ownerBookings });
});

module.exports = router;
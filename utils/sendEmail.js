const nodemailer = require("nodemailer");

const sendBookingEmail = async (toEmail, booking) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ParkEase" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Booking Confirmed - ParkEase",
    html: `
      <h2>Booking Confirmed ✅</h2>
      <p><strong>Parking Spot:</strong> ${booking.parkingspot}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
      <p><strong>Total Paid:</strong> ₹${booking.totalPrice}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookingEmail;
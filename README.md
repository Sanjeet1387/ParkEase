# ParkEase
ParkEase - Smart Parking Management System
ParkEase is a full-stack web application that allows users to discover, book, and manage parking spots in real time. The platform provides location-based parking discovery, time-slot bookings, secure reservations, QR-based parking passes, and a smooth user experience across devices.

🌟 Features
👤 User Features

User authentication (Signup / Login / Logout)

Search parking spots by city, address, or name

Advanced filters (state, city, price range, vehicle type, parking type)

“Near Me” parking search using live location

Time-slot based booking system

Live countdown timer for active bookings

QR code parking pass for entry verification

Booking history & booking confirmation page

Mobile-responsive UI

🅿️ Parking Owner Features

Add, edit, and delete parking spots

Upload parking images

Set hourly pricing

Prevent double booking (time-slot conflict validation)

View bookings for owned parking spots

🛠 System Features

Map integration using MapTiler + MapLibre

Cloudinary image storage

Secure server-side validation

Booking expiry handling

Filter drawer UI (Flipkart/Amazon-style)

Flash messages for better UX

🧑‍💻 Tech Stack
Frontend

HTML5

CSS3

Bootstrap 5

EJS (Embedded JavaScript Templates)

Vanilla JavaScript

Backend

Node.js

Express.js

MongoDB

Mongoose

Passport.js (Authentication)

Express-Session

Method-Override

Joi (Validation)

Third-Party Services

MapTiler API (Maps & Geocoding)

MapLibre GL JS

Cloudinary (Image Uploads)

QRCode (QR generation)

Nodemailer (Email notifications – optional)

🗺️ Map & Location Features

Forward geocoding for parking locations

Interactive map view for each parking spot

Marker-based visualization

Location-based “Near Me” filtering

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/parkease.git
cd parkease
2️⃣ Install dependencies
npm install
3️⃣ Create .env file
MAPTILER_API_KEY=your_maptiler_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_key
CLOUDINARY_API_SECRET=your_cloud_secret
SESSION_SECRET=your_secret_key
EMAIL_USER=your_app_email@gmail.com
EMAIL_PASS=your_gmail_app_password
4️⃣ Run the application
npm run dev

App will run at:

http://localhost:3000
📁 Project Structure
ParkEase/
│── controllers/
│── models/
│── routes/
│── views/
│   ├── layouts/
│   ├── parkingspots/
│   ├── bookings/
│── public/
│   ├── css/
│   ├── js/
│── utils/
│── middleware.js
│── app.js
│── .env
🔐 Booking Logic (Highlights)

Prevents overlapping time-slot bookings

Validates booking time before confirmation

Automatically expires bookings

QR code becomes invalid after booking end time

📱 Responsive Design

Fully responsive for mobile, tablet, and desktop

Clean navbar behavior on small screens

Drawer-based filter UI for better mobile UX

🎓 Academic Relevance

This project demonstrates practical implementation of:

Full-stack web development

RESTful routing

Authentication & authorization

Database modeling

Real-time UI behavior

Location-based services

🚀 Future Enhancements

Online payment gateway integration

Admin dashboard

Push notifications

Parking availability analytics

Progressive Web App (PWA)

QR scanning system for gate entry

🤝 Contribution

Contributions, issues, and feature requests are welcome.
Feel free to fork the repository and submit a pull request.

📜 License

This project is licensed under the ISC License.

👨‍💻 Author

Sanjeet Kumar
B.Tech – Computer Science
Full-Stack Web Developer

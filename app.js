if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");
const parkingspotsRouter = require("./routes/parkingspot");
const reviewsRouter = require("./routes/review");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user");
const userRouter = require("./routes/user");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// const Mongo_Url = 'mongodb://127.0.0.1:27017/ParkEase';
const Mongo_Url = process.env.MONGO_URI

main()
.then((res) => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(Mongo_Url);
}

//express-session setup for use
const sessionOptions = {
    secret: "mysecretsupercode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

//for filter drawer
app.use((req, res, next) => {
  res.locals.filters = req.query || {};
  next();
});

//root route
app.get("/", (req, res) => {
    res.redirect("/parkingspots");
});


app.use(session(sessionOptions));
app.use(flash()); // ise /parkingspots se pahle likhenge because hum usi k lie ise use kar rahe hai.

//passport ko use karne se pahle express-session implemented hona chahiye that't  why we write after sessiom middleware
app.use(passport.initialize());
app.use(passport.session());    // ek bar login k baad alag-alag request/pages k lie bar bar authenticate n karwaye that's why we use it.
passport.use(new LocalStrategy(User.authenticate())); // ye sare user ko localStrategy k through authenticate karwayega use authenticate method.

//use static serialize and deserialize of model for passport session suport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("failure");
    res.locals.currUser = req.user;
    next();
});

app.use("/parkingspots", parkingspotsRouter); //for handling parkingspots routes from routes

app.use("/parkingspots/:id/reviews", reviewsRouter);
app.use("/", userRouter);

//for booking
const bookingRoutes = require("./routes/booking");
app.use(bookingRoutes);

//for all route 
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", {message}); 
});


app.listen(8080, () => {
    console.log("listening to port no. 8080");
});

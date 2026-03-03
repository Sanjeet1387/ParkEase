const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {validateSignup, validateLogin, saveRedirectUrl} = require("../middleware")
const passport = require("passport");
const controllerUser = require("../controllers/user");

//for signup
router.route("/signup")
.get(controllerUser.renderSignupform)
.post(
    validateSignup,
    wrapAsync(controllerUser.Signup)
);

//for login
router.route("/login")
.get(controllerUser.renderLoginform)
.post(
    validateLogin,
    saveRedirectUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/login", 
            failureFlash: true
        }
    ),
    wrapAsync(controllerUser.Login)
);

//for logout
router.route("/logout")
.get(controllerUser.Logout);

module.exports = router;
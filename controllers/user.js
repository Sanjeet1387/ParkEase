const User = require("../Models/user");

module.exports.renderSignupform = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.Signup = async(req, res, next) => {
    //try and catch block islie use kar rahe taki error aane par ek lost page pe error message n show ho kar flash 
    // hokar aaye ye error message and fir se redirect ho jaye /signup path pe.
    try {
        let {username, dateOfBirth, gender, email, password} = req.body;
        const newUser = new User({username, dateOfBirth, gender, email});

        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to ParkEase!");
            res.redirect("/parkingspots");
        })
    }catch(err){
        req.flash("failure", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginform = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.Login = async(req, res) => {
    req.flash("success", "you have logged in successfully!");
    let redirectUrl = res.locals.redirectUrl || "/parkingspots"; // yani agar hum directly login se login karte hain 
    // then isLoggedIn middleware triggered hi nahi hoga,so res.locals.redirectUrl undefined hoga, toh is case me redirect honge on "/parkingspots" .

    res.redirect(redirectUrl);
};

module.exports.Logout = (req, res, next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/parkingspots");
    })
};
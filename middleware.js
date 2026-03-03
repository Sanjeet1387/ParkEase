const {parkingspotSchema, reviewSchema, signupSchema, loginSchema} = require("./schema");
const ExpressError = require("./utils/expressError");
const parkingspot = require("./Models/parkingspot");
const Review = require("./Models/review");


module.exports.validateSpot = (req, res, next) => {
    let {error} = parkingspotSchema.validate(req.body, {abortEarly: false});

    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        console.log(errMsg);
        throw new ExpressError(400, errMsg);
    }else{
        next()
    }
};

//validatio for review
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);

    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        console.log(errMsg);
        throw new ExpressError(400, errMsg);
    }
    next()
};

//validation for signup
module.exports.validateSignup = (req, res, next) => {
    let {error} = signupSchema.validate(req.body, {abortEarly: false});

    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        req.flash("failure", errMsg);
        return res.redirect("/signup");
    }
    next();
};

//validation for login
module.exports.validateLogin = (req, res, next) => {
    let {error} = loginSchema.validate(req.body, {abortEarly: false});

    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        req.flash("failure", errMsg);
        return res.redirect("/login");
    }
    next();
};

// check authentication 
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; //req.session k ander hi store karwa liya because sare request/middleware ke pass req.session ki access toh hoga hi.
        req.flash("failure","you must be logged in for this!");
        return res.redirect("/login");
    }
    next();
};

//afer login passport by-default session ko reset kar deta,toh req.session me jo bhi hoga wo sab delete jayega, that's why we use another middleware to save redirectUrl
// in res.locals , and ye locals variable har jagah accessible hote hai, and passport k pass access nahi hota hai isko delete karne ka.
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

//for authorize owner
module.exports.isOwner = async(req, res, next)=> {
    let {id} = req.params;
    let Parkingspot = await parkingspot.findById(id);
    if(!Parkingspot.owner.equals(res.locals.currUser._id)){
        req.flash("failure", "You are not the owner of this Spot!");
        return res.redirect(`/parkingspots/${id}`);
    }
    next();
};

module.exports.isreviewAuthor = async(req, res, next)=> {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("failure", "You are not the author of this review!");
        return res.redirect(`/parkingspots/${id}`);
    }
    next();
};
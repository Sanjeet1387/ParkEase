const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware");
const controllerReview = require("../controllers/review");

//Reviews's
//Post review Route
router.route("/")
.post(
    isLoggedIn,
    validateReview,
    wrapAsync(controllerReview.createReview)
);

//Delete review route
router.route("/:reviewId")
.delete(
    isLoggedIn,
    isreviewAuthor,
    wrapAsync(controllerReview.destroyReview)
);

module.exports = router;
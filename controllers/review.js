const ParkingSpot = require("../Models/parkingspot");
const review = require("../Models/review");

module.exports.createReview = async (req, res) => {
    let parkingspot = await ParkingSpot.findById(req.params.id);
    let newReview = new review(req.body.review); //yani form se jo bhi review's data aaya backend me usko newReview k ander store karwa lenge
    
    newReview.author = req.user._id;
    parkingspot.reviews.push(newReview);

    await newReview.save();
    await parkingspot.save(); //existing database me koi changes karte hai, then .save() ko call karna padta hai for change.
    
    req.flash("success","New review created!");
    console.log("new Review saved");
    res.redirect(`/Parkingspots/${parkingspot.id}`);
};

module.exports.destroyReview = async(req,res) => {
    let {id, reviewId} = req.params;

    await ParkingSpot.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await review.findByIdAndDelete(reviewId);

    req.flash("success","review deleted!")
    res.redirect(`/parkingspots/${id}`);
};
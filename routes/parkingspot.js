const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { validateSpot , isLoggedIn , isOwner} = require("../middleware");
const controllerParkingSpot =  require("../controllers/parkingspot");

const multer = require("multer");
const {storage} = require("../cloudConfig");
const upload = multer({storage});

//index route and create route
router.route("/")
.get(wrapAsync(controllerParkingSpot.index))
.post(
    isLoggedIn,
    validateSpot, 
    upload.single("parkingspot[image]"),
    wrapAsync(controllerParkingSpot.createNewSpot)
);

//new route
router.route("/new")
.get(
    isLoggedIn,
    controllerParkingSpot.renderNewform
);

//show route, update route and delete route
router.route("/:id")
.get(wrapAsync(controllerParkingSpot.showParkingSpot))
.put(
    isLoggedIn,
    validateSpot, 
    wrapAsync(controllerParkingSpot.updateParkingSpot)
)
.delete(
   isLoggedIn,
   isOwner,
   wrapAsync(controllerParkingSpot.destroyParkingSpot)
);

//edit route
router.route("/:id/edit")
.get(
    isLoggedIn,
    isOwner,
    wrapAsync(controllerParkingSpot.editParkingSpot)
);

module.exports = router;
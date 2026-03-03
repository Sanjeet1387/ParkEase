const ParkingSpot = require("../Models/parkingspot");
const { config, geocoding } = require("@maptiler/client");

const mapApiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
  // const allparkingspots = await ParkingSpot.find({});
  // // console.log(allparkingspots.schema.obj);

  const {
    search,
    state,
    city,
    type,
    vehicleType,
    minPrice,
    maxPrice,
    lat,
    lng,
    is24x7,
  } = req.query;

  let filter = {};

  /* SEARCH FILTER through search bar */
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { "location.address": { $regex: search, $options: "i" } },
      { "location.city": { $regex: search, $options: "i" } },
      { "location.state": { $regex: search, $options: "i" } },
      { "location.country": { $regex: search, $options: "i" } },
    ];
  }

  if (state) filter["location.state"] = state;
  if (city) filter["location.city"] = city;
  if (type) filter.type = type;
  if (vehicleType) {
    filter.vehicleType = { $in: [vehicleType] };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  //NEAREST PARKING (GEO FILTER)
  if (req.query.lat && req.query.lng) {
    filter.geometry = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        $maxDistance: 5000, //maxdistance 5km
      },
    };
  }

  if (req.query.is24x7) filter.is24x7 = true;

  const allparkingspots = await ParkingSpot.find(filter);

  res.render("parkingspots/index.ejs", {
    allparkingspots,
    filters: req.query, // this is for text or filter stay visible after searching or filtering
  });
};

module.exports.renderNewform = (req, res) => {
  res.render("parkingspots/new.ejs");
};

module.exports.showParkingSpot = async (req, res) => {
  let { id } = req.params;
  let parkingspot = await ParkingSpot.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  // console.log(parkingspot.title);

  if (!parkingspot) {
    req.flash("failure", "Parkingspot you requested for does not exist!");
    return res.redirect("/parkingspots"); //yani exist nahi karti then hum direct yahi redirect kar jayenge
  }
  res.render("parkingspots/show.ejs", { parkingspot });
};

module.exports.createNewSpot = async (req, res) => {
  let parkingspot = req.body.parkingspot;

  // ---------- Map ----------
  const { address, city, state, country } = parkingspot.location;

  const clean = (str) => str.replace(/\s+/g, " ").trim();

  const query = [
    clean(address),
    clean(city),
    clean(state),
    clean(country),
  ].join(", ");

  const result = await geocoding.forward(query, {
    apiKey: mapApiKey,
    limit: 1,
  });

  if (!result.features || result.features.length === 0) {
    req.flash("failure", "Location not found on map");
    return res.redirect("/parkingspots/new");
  }

  // Geometry
  parkingspot.geometry = result.features[0].geometry;

  // Image (safe)
  if (req.file) {
    parkingspot.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // Owner
  parkingspot.owner = req.user._id;

  // Save
  await new ParkingSpot(parkingspot).save();

  req.flash("success", "New Parking Spot Added!");
  res.redirect("/parkingspots");
};

module.exports.editParkingSpot = async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let parkingspot = await ParkingSpot.findById(id);

  if (!parkingspot) {
    req.flash("failure", "Parkingspot you requested for edit does not exist!");
    return res.redirect("/parkingspots"); //yani exist nahi karti then hum direct yahi redirect kar jayenge
  }
  res.render("parkingspots/edit.ejs", { parkingspot });
};

module.exports.updateParkingSpot = async (req, res) => {
  let { id } = req.params;

  let parkingspot = await ParkingSpot.findByIdAndUpdate(
    id,
    { ...req.body.parkingspot },
    { new: true },
  );

  // console.log(parkingspot);
  req.flash("success", "Parkingspot updated!");
  res.redirect(`/parkingspots/${id}`);
};

module.exports.destroyParkingSpot = async (req, res) => {
  let { id } = req.params;

  let parkingspot = await ParkingSpot.findByIdAndDelete(id);
  console.log(parkingspot);

  req.flash("success", "Parkingspot deleted!");
  res.redirect("/parkingspots");
};

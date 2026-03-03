// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const ParkingSpot = require("../Models/parkingspot.js");

// //establish connection
// const Mongo_URL = "mongodb://127.0.0.1:27017/ParkEase";

// main()
// .then((res) => {
//     console.log("connected to DB");
// })
// .catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(Mongo_URL);
// }

// const initDB = async () => {
//     await ParkingSpot.deleteMany({});
//     initData.data = initData.data.map((obj) => ({...obj, owner: '68ce66026475fa361f63ab02'}));
//     await ParkingSpot.insertMany(initData.data);
//     console.log("data was initialized");
// }

// //now call initDB function
// initDB();

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const initData = require("./data.js");
const ParkingSpot = require("../Models/parkingspot.js");
const { config, geocoding } = require("@maptiler/client");

config.apiKey = process.env.MAPTILER_API_KEY;

// console.log("MapTiler Key Loaded:", process.env.MAPTILER_API_KEY);

if (!config.apiKey) {
  throw new Error("MAPTILER_API_KEY not found in environment variables");
}

const Mongo_URL = "mongodb://127.0.0.1:27017/ParkEase";

async function main() {
  await mongoose.connect(Mongo_URL);
  console.log("connected to DB");
}

const initDB = async () => {
  await ParkingSpot.deleteMany({});

  const spotsWithGeometry = [];

  for (let spot of initData.data) {
    const { address, city, state, country } = spot.location;
    const query = `${address}, ${city}, ${state}, ${country}`;

    const result = await geocoding.forward(query, {
      limit: 1,
    });

    if (!result.features.length) continue;

    spot.geometry = result.features[0].geometry;
    spot.owner = "68ce66026475fa361f63ab02";

    spotsWithGeometry.push(spot);
  }

  await ParkingSpot.insertMany(spotsWithGeometry);
  console.log("data was initialized with geometry");
};

main().then(initDB).catch(console.error);
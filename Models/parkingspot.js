const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require('../Models/review');
const User = require("../Models/user");

const parkingspotSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
            default: "https://media.istockphoto.com/id/1854014729/photo/carpark.webp?a=1&b=1&s=612x612&w=0&k=20&c=tlM0_QI0t_7r0S65c9oftVHbAVKQWiedPaH9dqYCfU8=",

            set: (v) => 
                v === ""
            ? "https://media.istockphoto.com/id/1854014729/photo/carpark.webp?a=1&b=1&s=612x612&w=0&k=20&c=tlM0_QI0t_7r0S65c9oftVHbAVKQWiedPaH9dqYCfU8="
            :v,
        },
    },
    price: {
        type: Number,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    geometry: {
        type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
        },
        coordinates: {
        type: [Number],
        required: true
        }
    },

    type: {
    type: String,
    enum: ["open", "covered", "basement", "street"],
    default: "open",
    },

    vehicleType: {
    type: [String], // ["bike", "car", "suv"]
    default: ["car"],
    },

    is24x7: {
    type: Boolean,
    default: false,
},

});

/*GEO INDEX */
parkingspotSchema.index({ geometry: "2dsphere" });


parkingspotSchema.post("findOneAndDelete", async (parkingspot) => {
    if(parkingspot){
        await Review.deleteMany({_id: {$in: parkingspot.reviews}});
    }
});

const ParkingSpot = mongoose.model("ParkingSpot", parkingspotSchema);

module.exports = ParkingSpot;
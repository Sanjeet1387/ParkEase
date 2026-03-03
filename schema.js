const Joi = require("joi");

module.exports.parkingspotSchema = Joi.object({
    parkingspot: Joi.object({
        title: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().allow("", null),
        }),
        location: Joi.object({
            address: Joi.string().required(),
            city: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            state: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            country: Joi.string().pattern(/^[A-Za-z\s]+$/).required()
        }).required(),
    }).required()
}); 

//define schema for review
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});

//define schema for signup and login
module.exports.signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  dateOfBirth: Joi.date().less('now').required(),   // must be valid past date
  gender: Joi.string().valid("male", "female", "other").required()
});

module.exports.loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(5).required()
});
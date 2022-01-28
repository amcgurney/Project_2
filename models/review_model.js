const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
        user: {
        type: String,
        required: [true]
        },
        title: {
            type: String,
            required: [true],
        },
        date: {
            type: Date,
            default: Date.now,
            // required: [true],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "You must provide a score"]
        },
        comment: {
            type: String,
            required: [true],
            maxLength: 280,
            //How do you limit length of comment?
        },
        receipe: {
            type: mongoose.Types.ObjectId,
            ref: "Recipe",
            // relationship to 'Recipe'
        }, 
    },
    {
        timestamps: true, // fields createdAt and updatedAt
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

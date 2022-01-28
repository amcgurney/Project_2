const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true]
    },
    date: {
        type: Date,
        default: Date.now,
        // required: [true],
    },
    title: {
        type: String,
        required: [true],
    },
    category: {
        type: String,
        required: [true],
        enum: ['breakfast', 'lunch', 'dinner'],
        // enum makes it so that only provided answers will be accepted
    },
    description: {
        type: String,
    },
    ingredients: {
        type: [String],
        required: [true]
        // do I want to make this an array ot list of some sort?
    },
    recipe: {
        type: [String],
        required: [true]
    },
    image: {
        type: String,
        required: [true],
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
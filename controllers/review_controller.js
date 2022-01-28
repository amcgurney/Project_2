const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/:recipeTitle/reviews', async (req, res, next) => {
    try {
        const title = req.params.recipeTitle
        const foundReviews = await db.Review.find('title: {title}')
        console.log([req.params.recipeTitle])
        console.log(foundReviews);
        const context = { foundReviews }
        console.log('========================================')
        // console.log(`THIS IS THE CONTEXT OF RECIPE PAGE ${context}`);
        console.log('========================================')
        res.render('recipe.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

/* ^ this route will catch GET requests to /recipeblog/:recipeTitle/reviews
 and respond with all reviews for a single recipe */
//------------------------------------------------------------------
//------------------------------------------------------------------

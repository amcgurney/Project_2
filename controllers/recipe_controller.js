const express = require('express');
const router = express.Router();
const db = require('../models')

/*
/home
homes.ejs
/recipe/id
recipe.ejs
post
post.ejs
category/breakdast || lunch || dinner
category.ejs
*/



router.get("/new", function(req, res) {
    res.render("post.ejs")
})
// this route will catch route to a form allowing user to post new recipe

router.post('/', async (req, res, next) => {
    try {
        const createdRecipe = await db.Recipe.create(req.body)
        console.log(createdRecipe);

        res.redirect("/home");
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})
// this route will add createdRecipe to the req.body

router.get('/:recipeId', async (req, res, next) => {
    try {
        const foundRecipe = await db.Recipe.findById(req.params.recipeId)
        console.log(foundRecipe);
        const context = { recipe: foundRecipe }
        res.render('recipe.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});
// this route will catch GET requests to /recipe/index/ and respond with a single product



const express = require('express');
const router = express.Router();
const db = require('../models')

// const db = require('../seed.js')
// const { Recipe } = require('../seed.js');

router.get('/home', async (req, res, next) => {
    
    try {
        const recipes = await db.Recipe.find({});
        const context = { recipes }
        return res.render('home.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// ^ this route will catch GET requests tor recipeblog/home -- listing all recipes (index page)
// ---------------------------------------------------------------
//------------------------------------------------------------------
router.post('/home', async (req, res, next) => {

    try {
        const createdRecipe = await db.Recipe.create(req.body)
        console.log(createdRecipe);

        res.redirect("/recipeblog/home");
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})
// ^ this defines route for creating and posing new recipes


router.get("/allrecipes/new", function(req, res) {
    res.render("post.ejs")
})

// ^ this route will catch GET requests to /recipeblog/allrecipes/new
// ^ will route to post.ejs new form
//------------------------------------------------------------------
//------------------------------------------------------------------


router.get('/allrecipes/:category', async (req, res, next) => {
    try {
        const category = req.params.category
        const foundCategory = await db.Recipe.find({category})

        console.log(foundCategory);
        const context = { foundCategory }
        res.render('categories.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});


// ^ this route will catch GET requests to /recipeblog/allrecipes/:category/ and respond with all recipes in that category
//------------------------------------------------------------------
//------------------------------------------------------------------

router.get('/:recipeTitle', async (req, res, next) => {
    try {
        const title = req.params.recipeTitle
        const foundRecipe = await db.Recipe.findOne({title})
        console.log([req.params.recipeTitle])
        console.log(foundRecipe);
        const allReviews = await db.Review.find({})
        const context = { foundRecipe }
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

// ^ this route will catch GET requests to /recipeblog/:recipeTitle/ and respond with a single recipe
//------------------------------------------------------------------
//------------------------------------------------------------------

router.delete('/:recipeTitle', async (req, res, next) => {
    try {
        const itemToDelete = req.params.recipeTitle
        const deletedRecipe = await db.Recipe.findOneAndDelete({title: itemToDelete});

        console.log(`THIS DELETED THE RECIPE ${deletedRecipe}`);
        res.redirect('/recipeblog/home');
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// this method will delete recipe
//------------------------------------------------------------------
//-----------------------------------------------------------------
// router.get('/:recipeTitle/edit', async (req, res, next) => {
//     try {
//         const updatedRecipe = await db.Recipe.findOne(req.params.recipeTitle);

//         console.log(updatedRecipe);
//         return res.render('edit.ejs', { updatedRecipe })
//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// })

router.get('/:recipeTitle/edit', async (req, res, next) => {
    try {
        const title = req.params.recipeTitle
        const foundRecipe = await db.Recipe.findOne({title: title});

        console.log(`THIS IS THE FOUND RECIPE FOR EDITING ${foundRecipe}`);
        return res.render('edit.ejs', { foundRecipe: foundRecipe })
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})


// ^ this will require an edit.ejs form to take the info
// ^ once it is created, I will change router.get 
//------------------------------------------------------------------
//------------------------------------------------------------------

router.put('/:recipeTitle', async (req, res, next) => {

    try {
        const title = {title: req.params.recipeTitle}
        console.log(`THIS IS THE FILTER FOR THE TITLE ${title}`)
        // const updatedRecipe = await db.Recipe.findOneAndUpdate({title});

        const updatedRecipe = await db.Recipe.findOneAndUpdate(title, req.body);
        //need to pass the req.body
        console.log(`THIS IS THE EDITED RECIPE ${updatedRecipe}`);
        return res.redirect("/recipeblog/home");
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

//------------------------------------------------------------------
//------------------------------------------------------------------

module.exports = router;



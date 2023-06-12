;
// Importar todos los controllers;
const getRecipeById = require("../controllers/getRecipeById")
const getRecipeByName = require("../controllers/getRecipeByName")
const postRecipe = require("../controllers/postRecipes")
const getDiets = require("../controllers/getDiets")






const router = require("express").Router() // Ejecutamos router 

//RUTAS RECIPES
router.get('/recipes/:id', async (req, res) => {
    getRecipeById(req, res)
})

router.get('/recipes', async (req, res) => {
    console.log("entra");
    getRecipeByName(req, res)
})
router.post("/recipes", async (req,res)=>{
    postRecipe(req,res)
})

//RUTAS DIETS
router.get("/diets",async(req,res)=>{
    getDiets(req,res)
})








module.exports = router;

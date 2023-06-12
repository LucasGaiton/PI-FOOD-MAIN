const axios = require("axios")
const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=960565680fa546fba11fe01bb8e38180&number=100&addRecipeInformation=true&number=100"
const { Recipe, Diets } = require("../db")
const { findAllEndPoint } = require("../../addEndPont")
const { Op } = require("sequelize")
//Mis funciones 
const { RecipesTransformer } = require("../myFunctions/Functions")


async function getDiets(req, res) {
    try {
        let foundDietsBd = []
        let foundDietsApi = [] 
        let aux = await Diets.findAll()
        if(aux.length == 0){
            const {data} = await axios.get(URL)

            for(const recipe of data.results){
                if(recipe.vegetarian == true && !foundDietsApi.includes("vegetarian")) foundDietsApi.push("vegetarian")
                if(recipe.vegan == true && !foundDietsApi.includes("vegan")) foundDietsApi.push("vegan")
                if(recipe.glutenFree == true && !foundDietsApi.includes("gluten free")) foundDietsApi.push("gluten free")
                
                recipe.diets.forEach(element => {
                    if(!foundDietsApi.includes(element)) foundDietsApi.push(element)
                });
            }
            return res.status(200).json(foundDietsApi)
        }
        aux.forEach((elem)=> foundDietsBd.push(elem.name) )
        return res.status(200).json(foundDietsBd)

    } catch (error) {
        return res.status(500).send(error.message)

    }

}
module.exports = getDiets
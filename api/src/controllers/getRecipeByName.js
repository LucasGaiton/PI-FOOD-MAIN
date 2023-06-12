const axios = require("axios")
const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=960565680fa546fba11fe01bb8e38180&number=100&addRecipeInformation=true&number=100"
const { Recipe } = require("../db")
const {findAllEndPoint } = require("../../addEndPont")
const { Op } = require("sequelize")
//Mis funciones 
const {RecipesTransformer} = require("../myFunctions/Functions")


async function getRecipeByName(req, res) {
    try {
        const nombre = req.query.name
        const name = nombre.toLowerCase()
        console.log(name);
        let foundRecipesBd = []
        let foundRecipesApi = []

        if(!nombre){
            foundRecipesBd = await Recipe.findAll()
            const {data} = await axios.get(findAllEndPoint)
            foundRecipesApi = data.results
            return res.status(200).json([...foundRecipesBd,...foundRecipesApi])

        } 
        //Buscar en la base de datos 
        // foundRecipesBd = await Recipe.findAll(
        //     {
        //         where: {
        //             nombre: {
        //                 [Op.iLike]: `%${name}%`
        //             }
        //         }
        //     }
        // )
        //Bucamos en la api
        const {data} = await axios.get(findAllEndPoint)
        foundRecipesApi = data.results.filter((recipe)=>recipe.title.toLowerCase().includes(name))
        //if(foundRecipesApi || foundRecipesBd )

        const recipes = [...foundRecipesBd,...foundRecipesApi].map((recipe)=>{
            return RecipesTransformer(recipe)
        })
        return res.status(200).json(recipes)
        


    } catch (error) {
        return res.status(500).send(error.message)

    }

}
module.exports = getRecipeByName
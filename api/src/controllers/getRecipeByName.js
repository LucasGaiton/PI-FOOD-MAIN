const axios = require("axios")
const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=1505d2975d724ba9b0b9179600289ab5&number=100&addRecipeInformation=true&number=100"
const { Recipe, Diets } = require("../db")
const { findAllEndPoint } = require("../../addEndPont")
const { Op } = require("sequelize")
//Mis funciones 
const { RecipesTransformer } = require("../myFunctions/Functions")


async function getRecipeByName(req, res) {
    try {
        //Pedimos la query
        const nombre = req.query.name
        //Instanciamos los arreglos 
        let foundRecipesBd = []
        let foundRecipesApi = []

        if (!nombre) {
            console.log("PAsas");
            foundRecipesBd = await Recipe.findAll({include:Diets})
            //Agregamos una propiedad a las recipes traidas de la base de datos
            if (foundRecipesBd) {
                foundRecipesBd.forEach((recipe) => recipe.dataValues.dataBase = true )
                console.log(foundRecipesBd);
            }
            const { data } = await axios.get(findAllEndPoint)

            foundRecipesApi = data.results
            const resul = foundRecipesApi.map((recipe) => RecipesTransformer(recipe))
            

            return res.status(200).json([...foundRecipesBd,...resul])
        }


        //Buscar en la base de datos 
        const name = nombre.toLowerCase()
        foundRecipesBd = await Recipe.findAll(
            {
                where: {
                    nombre: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            }
        )
        //Bucamos en la api
        const { data } = await axios.get(findAllEndPoint)
        foundRecipesApi = data.results.filter((recipe) => recipe.title.toLowerCase().includes(name))
        //if(foundRecipesApi || foundRecipesBd )

        const recipes = [...foundRecipesBd, ...foundRecipesApi].map((recipe) => {
            return RecipesTransformer(recipe)
        })
        return res.status(200).json(recipes)



    } catch (error) {
        return res.status(500).send('Entra a este catch')

    }

}
module.exports = getRecipeByName
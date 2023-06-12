const axios = require("axios")
const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=960565680fa546fba11fe01bb8e38180&number=100&addRecipeInformation=true&number=100"
const { Recipe, Diets } = require("../db")
const { findAllEndPoint } = require("../../addEndPont")
const { Op } = require("sequelize")
//Mis funciones 
const { RecipesTransformer } = require("../myFunctions/Functions")


const postRecipe = async (req, res) => {
    try {
        const { name, image, resume, healthScore, steps, diets } = req.body


        console.log("paso por aca");
        console.log(typeof diets);

        //Validaciones
        if (!name || !image || !resume || !healthScore || !steps || !diets) {
            return res.status(401).send("Faltan datos")
        }

        //Creamos el modelo recipe 
        const postrecipe = await Recipe.create({ name, image, resume, healthScore, steps })


        //Creamos el modelo diet
        if (diets.length > 1) { // Preguntmaos si se nos cargo mas de una dieta en el array 
            
            //Cargamos todas las asincronias y las instancias en un array, en donde tambien preguntamos si 
            //existe una dieta ya existente con ese nombre 
            const promises = diets.map(diet => {
                let foundDiet = Diets.findOne({ where: { name: diet } })
                if (!foundDiet)
                    return Diets.create({ name: diet })
                return foundDiet
            })

            await Promise.all(promises). //Utilizamos un promise All para que capture todas las asincronias 
                then(async createdDiets => {
                    for (const diet of createdDiets) {
                        await postrecipe.setDiets(diet) // Relacionamos todas las instancias de las diets con la recipe 
                    }
                }).
                catch(error => {
                    console.error('Error al crear las dietas:', error);
                })


        } else { // Es para el caso de que venga una sola dieta y hacemos lo mismo 

            let foundDiet = await Diets.findOne({ where: { name: diets[0] } })
            if (!foundDiet) {
                const createdDiet = await Diets.create({ name: diets[0] })
                await postrecipe.setDiets(createdDiet)
            }
            else{
                await postrecipe.setDiets(foundDiet)
            }
        }
        return res.status(200).json("Se cargo correctamente")

    } catch (error) {
        return res.status(500).send(error.message)

    }

}
module.exports = postRecipe
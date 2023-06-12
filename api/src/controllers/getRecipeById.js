//Importamos la tabla 
const URL = "https://api.spoonacular.com/recipes/{id}/information"
const { Recipe } = require("../db")
const axios = require("axios")
//importmaos cosas extra 
const { apiKey, END_POINT_ERROR, dietaFlag } = require("../../addEndPont")
const {RecipesTransformer} = require("../myFunctions/Functions")

const getrecipeById = async (req, res) => {
    try {
        const { id } = req.params
        // const obj = await Recipe.findOne({where:{id}})
        // if(!obj){
            console.log("entra aca");
            const {data} = await axios.get(`https://api.spoonacular.com/recipes/${id}/information${apiKey}${dietaFlag}`)
            const obj = RecipesTransformer(data)
            
        // }
        res.status(200).json(obj)
    }

    catch (error) {
        return res.status(500).send(error.message)

    }

}
module.exports = getrecipeById

//Importamos la tabla 
const URL = "https://api.spoonacular.com/recipes/{id}/information"
const { Recipe } = require("../db")
const axios = require("axios")
//importmaos cosas extra 
const { apiKey, END_POINT_ERROR, dietaFlag } = require("../../addEndPont")
const { RecipesTransformer } = require("../myFunctions/Functions")

const getrecipeById = async (req, res) => {
    //Utilizamos una expresion regular para indentificar id de tipo UUID
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    try {
        const { id } = req.params
        let obj = ""
        if (uuidPattern.test(id)) { // LO utilizamos para que no de un error de el id 
            obj = await Recipe.findOne({ where: { id } })
        }
        if (!obj) {
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information${apiKey}${dietaFlag}`)
            obj = RecipesTransformer(data)

        }
        res.status(200).json(obj)
    }

    catch (error) {
        return res.status(501).send(error.message)

    }

}
module.exports = getrecipeById

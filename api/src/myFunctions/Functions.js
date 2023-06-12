const RecipesTransformer = (recipe) => {
    let aux = []
    if (recipe.glutenFree) aux.push("glutenFree")
    if (recipe.vegetarian) aux.push("vegetarian")
    if (recipe.vegan) aux.push("vegan")
    return {
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        resume: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0].steps,
        diets: aux


    }
}
module.exports = {
    RecipesTransformer
}
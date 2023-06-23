const RecipesTransformer = (recipe) => {
    let aux = []
    let steps = []
    if (recipe.vegetarian) {aux.push("vegetarian")}
    if (recipe.analyzedInstructions.length > 0) steps = recipe.analyzedInstructions[0].steps

    return {
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        resume: recipe.summary,
        healthScore: recipe.healthScore,
        steps: steps,
        diets: [...recipe.diets, ...aux]


    }
}
module.exports = {
    RecipesTransformer
}
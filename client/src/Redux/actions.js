//Aca van a ir la action; son funciones que retornan objetos 
//Importamos axios 
import axios from "axios";



// ACTION | showHome
export const showHome = () => {
    const endpoint = 'http://localhost:3001/foods/recipes';
    return (async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)
            let recipes = []
            for (let i = 0; i < 72; i++) {
                recipes.push(data[i])
            }
            console.log(recipes);
            return (dispatch({
                type: 'SHOW_HOME',
                payload: recipes,
            }))

        } catch (error) {
            console.log(error.message);

        }
    });
};
export const allRecipes = () => {
    const endpoint = 'http://localhost:3001/foods/recipes';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)
            console.log("llama al servidor");
            return dispatch({
                type: 'ALL_RECIPES',
                payload: data,
            });
        } catch (error) {
            console.log(error.message);

        }

    };
};

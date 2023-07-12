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
export const filterRecipes = (recipes) => {
    return (
        {
            type: 'FILTER_RECIPES',
            payload: recipes

        }
    )

}
export const loadSearch = (name) => {
    const endPoint = `http://localhost:3001/foods/recipes?name=${name}`;

    return async (dispatch) => {
        try {
            let { data } = await axios.get(endPoint);
            console.log("Entra en la api");
            console.log(data);
            dispatch({
                type: "LOAD_SEARCH",
                payload: data
            });
        } catch (error) {
            console.log(error.message);
        }
    };
};
export const loadingDetail = (id) =>{
    console.log(id);
    const endPoint = `http://localhost:3001/foods/recipes/${id}`
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endPoint)
            console.log(data);
            return dispatch({
                type: 'LOAD_DETAIL',
                payload: data,
            });
        } catch (error) {
            console.log(error.message);

        }

    };
}
export const deleteDetail = () => {
    return(
        {
            type:"DELETE_DETAIL",
        }
    )

}
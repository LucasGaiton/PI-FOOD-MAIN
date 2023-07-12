//Se debe crear el estado global con nombre initialState
const initialState = {
    recipesHome: [],
    AllRecipes: [],
    filterRecipes: [],
    detail:{}
}



//Creamos el reducer 
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "SHOW_HOME": return {
            ...state, recipesHome: action.payload
        };
        case "ALL_RECIPES": return {
            ...state, AllRecipes: action.payload
        }
        case 'FILTER_RECIPES': return {
            ...state, filterRecipes: action.payload
        }
        case 'LOAD_SEARCH': return {
            ...state, filterRecipes: action.payload
        }
        case "LOAD_DETAIL" : return {
            ...state, detail:action.payload
        }
        case "DELETE_DETAIL" : return {
            ...state, detail:{}
        }
        default: return { ...state }
    }

}
export default reducer
//Se debe crear el estado global con nombre initialState
const initialState = {
    recipesHome: [],
    AllRecipes:[],
    filterRecipes:[]

    
}



//Creamos el reducer 
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "SHOW_HOME": return { 
            ...state, recipesHome: action.payload};
        case "ALL_RECIPES": return {
            ...state, AllRecipes: action.payload
        }
        default: return { ...state }
    }
    
}
export default reducer
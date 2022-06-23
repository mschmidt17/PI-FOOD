import {GET_CLEAN} from "./actions.js"

const initialState = {     
    recipes: [],
    allRecipes: [],
    detail: [],
    diets: []
}


function rootReducer (state = initialState, action) {
    switch (action.type){
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,         //en mi estado recipes, manda todo lo que envie la accion getrecipes
                allRecipes: action.payload      // el estado que se siempre mantiene con todas las recetas
            }
        
        case 'GET_NAME_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }

        case 'POST_RECIPE':
            return{
                ...state,  
            }
        
        case 'FILTER_BY_DIET':
            const allRecipes= state.allRecipes //copia del estado
            const dietsFiltered = 
                action.payload === "All" 
                ? allRecipes 
                : allRecipes.filter((recipe) => recipe.diets.includes(action.payload));
            return{
                ...state,
                recipes: dietsFiltered,
            }; 


        case 'FILTER_BY_NAME':
            if (action.payload === "desc") {
                return{
                    ...state,
                    recipes: [...state.recipes].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)),
                } 
            }
            else {
                return{
                    ...state,
                    recipes: [...state.recipes].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
                }
            };


        case 'FILTER_BY_SCORE':
            if (action.payload === "low") {
                return {
                    ...state,
                    recipes: [...state.recipes].sort((a, b) => {
                        if (a.healthScore > b.healthScore) return 1;
                        if (a.healthScore < b.healthScore) return -1;
                        else return 0;
                    })
                }
            }
            else {
                return {
                    ...state,
                    recipes: [...state.recipes].sort((a, b) => {
                        if (a.healthScore < b.healthScore) return 1;
                        if (a.healthScore > b.healthScore) return -1;
                        else return 0;
                    })
                }
            };

        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }

        case GET_CLEAN:
            return{
                ...state,
                datail: []
            }    
        
        default: 
            return state
    }
};



export default rootReducer;  
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
                recipes: action.payload,     //en mi estado recipes, manda todo lo que envie la accion getrecipes
                allRecipes: action.payload  // el estado que se siempre mantiene con todas las recetas
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
                ...state,   //post no necesita-> crea en otra ruta
            }
        
        case 'FILTER_BY_DIET':
            const allRecipes= state.allRecipes //copia del estado
            const dietsFilter = action.payload === "All" 
                ? state.allRecipes 
                : allRecipes.filter((recipe) => 
                recipe.createdInDb
                    ? recipe.diets.find((diet) => {
                        if (diet.name === action.payload) {
                            return recipe;
                        }   
                })
                : recipe.diets.find((diet) => {
                    if (diet.includes(action.payload)) {
                        return recipe;
                    }
                }));
            return{
                ...state,
                recipes: dietsFilter,
            }; 


        case 'FILTER_BY_NAME': 
            let orderName = state.recipes?.sort((a, b) => {   
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    if (action.payload === 'asc') {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    if (action.payload === 'desc') {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                return 0   //si son iguales
            });
            console.log(orderName)
            return {
                ...state,
                recipes: orderName,
            };

        case 'FILTER_BY_SCORE':
            let orderScore = 
                action.payload === 'low' 
                ? state.recipes.sort(function (a, b) {
                    if (a.score > b.score) {
                        return 1;
                    }
                    if (b.score > a.score) {
                        return -1;
                    }
                    return 0;
                })
                : state.recipes.sort(function (a, b) {
                    if (a.score > b.score) {
                        return -1;
                    }
                    if (b.score > a.score) {
                        return 1;
                    }
                        return 0;
                });
            console.log(orderScore)
            return {
                ...state,
                recipes: orderScore,
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
  
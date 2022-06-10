import {
    CLEAN_DETAIL,
    FILTER_DIETS,
    GET_API_INFO_ALL,
    GET_DETAIL,
    GET_TYPES_DIETS,
    ORDER_BY_NAME,
    ORDER_BY_SCORE,
    SEARCH_BY_NAME,
    POST_RECIPE,
    NAME_USER,
    SELECT_DIETS,
} from './actions.js';

const initialState = {
    recipesAll: [],
    recipes: [],
    detail: {},
    dietsAll: [],
    nameUser: [],
};
  
const rootReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_API_INFO_ALL:
            return {
                ...state,
                recipesAll: actions.payload,
                recipes: actions.payload,
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: actions.payload,
            };
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: {},
            };
        case GET_TYPES_DIETS:
            return {
                ...state,
                dietsAll: actions.payload,
            };
        case ORDER_BY_NAME:
            let orderName = state.recipesAll?.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    if (actions.payload === 'asc') {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    if (actions.payload === 'dsc') {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                return 0;
            });
            return {
                ...state,
                recipesAll: orderName,
            };
        case ORDER_BY_SCORE:
            let orderScore =
            actions.payload === 'low'
                ? state.recipesAll.sort(function (a, b) {
                    //sort-> compara y ordena izq o der d
                    if (a.score > b.score) {
                        return 1;
                    }
                    if (b.score > a.score) {
                        return -1;
                    }
                    return 0; //si son iguales
                })
                : state.recipesAll.sort(function (a, b) {
                    if (a.score > b.score) {
                        return -1;
                    }
                    if (b.score > a.score) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                recipesAll: orderScore,
            };
        case FILTER_DIETS:
            const recipesfilter = state.recipes;
            const recipesfiltered =
            actions.payload === 'All'
                ? state.recipes
                : recipesfilter.filter((recipe) =>
                    recipe.createInDb
                    ? recipe.diets.find((diet) => {
                        if (diet.name === actions.payload) {
                            return recipe;
                        }
                    })
                    : recipe.diets.find((diet) => {
                        if (diet.includes(actions.payload)) {
                            return {
                                recipe,
                            };
                        }
                    })
                );
            return {
                ...state,
                recipesAll: recipesfiltered,
            };
        case POST_RECIPE:
            return {
                ...state,
            };
        case SEARCH_BY_NAME:
            return {
                ...state,
                recipesAll: actions.payload,
            };
        case SELECT_DIETS:
            return {
                ...state,
                dietsAll: state.dietsAll.filter((diet) => diet.name !== actions.payload),
            };
        case NAME_USER:
                return {
                    ...state,
                    nameUser: actions.payload,
                };
        default:
        return state;
    }
};

export default rootReducer;
  
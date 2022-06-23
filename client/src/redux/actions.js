import axios from "axios";   
export const GET_CLEAN = "GET_CLEAN"

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes")
    return dispatch({
      type: 'GET_RECIPES',
      payload: json.data,

    })
  }
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: 'GET_DIETS',
      payload: json.data,
    })
  }
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const data = await axios.post("http://localhost:3001/recipes", payload)  //post del payload
    return data
  }

}

export function filterRecipesByDiet(payload) {
  return {
    type: 'FILTER_BY_DIET',
    payload,
  }
}

export function filterByName(payload) {  
  return {
    type: 'FILTER_BY_NAME',
    payload,
  }
}

export function filterByScore(payload) {
  return {
    type: "FILTER_BY_SCORE",
    payload,
  }
}


export function getNameRecipes(name) { //por busqueda -> query
   return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
      console.log(json.data)
      return dispatch({
        type: 'GET_NAME_RECIPES',
        payload: json.data,
      })
    } 
    catch (error) {
      return dispatch({
        type: 'GET_NAME_RECIPES',
        payload: []
      });
    }
  }
}

export function getRecipeDetail(id) {
  return function (dispatch) {
      axios.get(`http://localhost:3001/recipes/${id}`)
      .then(res => dispatch({
        type: 'GET_DETAIL', 
        payload: res.data
      }))
      .catch(err => console.error(err))
    }
  
}

export function getClean(){
  return{
    type: GET_CLEAN,
  }
}
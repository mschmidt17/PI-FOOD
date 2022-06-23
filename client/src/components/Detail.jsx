import React from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipeDetail, getClean } from "../redux/actions.js";
import Loading from "./Loading.jsx";
import "../CSS/Detail.css"


export default function Detail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const myRecipe = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getRecipeDetail(id))                       //props.match.params.id
        return () => {
            dispatch(getClean())
        };                 
    }, [dispatch, id])                 



  console.log(myRecipe)

    return (
        <div className="super-contenedor">
            <Link to='/home'>
                <button className='button'> HOME </button>
            </Link>

            {myRecipe.length === 0 ?
            <Loading/>
            :
            <div className='detail-contains'>
                <div> 
                    <div className="detail-header">
                        <h1 className='h1'> {myRecipe[0].name} </h1> 
                    </div>
                    
                    <div className="info-detail">
                        <div className="detail-row1">
                            <img className='img' src={myRecipe[0].image} alt="no se encontro la imagen" />
                            
                            <div>
                                <h2 className='titles'>Diets:</h2>
                                <h5>{myRecipe[0].diets && myRecipe[0].diets.map(el => el + ", ")}</h5>
                            </div>
                            
                            <div>
                                <h2 className='titles'>Dish types:</h2>
                                <h5 className='dt'>{myRecipe[0].dishTypes ? myRecipe[0].dishTypes.map(d => d + ", ") : 'Dish type not found'}</h5>
                            </div>
                        </div>

                        <div className="detail-row2">
                            <div>
                                <h2 className='titles'>Summary:</h2>
                                <h4 className='summary'> <div dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }} /></h4>
                            </div>
                            
                            <div>
                                <h3>Health Score: {myRecipe[0].healthScore}</h3>
                            </div>
                            

                            <div>
                                <h5 className='titles'>Steps:</h5>
                                {myRecipe.createInDb 
                                    ? (<h4 className='steps'>{myRecipe[0].steps ? myRecipe[0].steps : "This recipe doesnt have steps"}</h4>)
                                    : (<h4 className='steps'>{myRecipe[0].steps ? myRecipe[0].steps.map(e => e) : "This recipe doesnt have steps"}</h4>)
                                }
                            </div>
                        </div>

                    </div>

                </div> 
            </div>
            }
        </div>
   )
}


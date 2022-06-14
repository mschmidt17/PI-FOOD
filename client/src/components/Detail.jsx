import React from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipeDetail, getClean } from "../redux/actions.js";
import "../CSS/Detail.css"


export default function Detail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    

    useEffect(() => {
        dispatch(getRecipeDetail(id))                       //props.match.params.id
        return ()=>{dispatch(getClean())}                  //BLANQUEO EL ESTADO GLOBAL
    }, [dispatch, id])                 

    const myRecipe = useSelector(state => state.detail)

  

    return (
        <div className="super-contenedor">
            <Link to='/home'>
                <button className='button'> HOME </button>
            </Link>
            <div className='detail-contains'>
                {myRecipe.length > 0 ?
                <div> 

                    <div className="detail-header">
                        <h1 className='h1'> {myRecipe[0].name && myRecipe[0].name} </h1> 
                    </div>
                    
                    <div className="info-detail">
                        <div className="detail-row1">
                            <img className='img' src={myRecipe[0].image ? myRecipe[0].image : 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80'} alt="no se encontro la imagen" />
                            
                            <div>
                                <h5 className='titles'>Tipe of diet:</h5>
                                <h2>{myRecipe[0].diets && myRecipe[0].diets.map(el => el.name + ", ")}</h2>
                            </div>
                            
                            <div>
                                <h5 className='titles'>Dish type:</h5>
                                <h3 className='dt'>{myRecipe[0].dishTypes ? myRecipe[0].dishTypes.map(d => d.name) : 'Dish type not found'}</h3>
                            </div>
                        </div>

                        <div className="detail-row2">
                            <div>
                                <h5 className='titles'>Summary:</h5>
                                <h3 className='summary'> <div dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }} /></h3>
                            </div>
                            
                            <div>
                                <h5 className='titles'>Health Score:</h5>
                                <h2>{myRecipe[0].healthScore && myRecipe[0].healthScore}</h2>
                            </div>
                            
                            <div>
                                <h5 className='titles'>Steps:</h5>
                                <h4 className='steps'>{Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map(e => e.steps.map(f => f.step)) : myRecipe[0].steps}</h4>
                            </div>
                        </div>

                    </div>

                </div> : <p> LOADING...</p>
                }
            </div>
        </div>
   )
}

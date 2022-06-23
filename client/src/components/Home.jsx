import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import  "../CSS/Home.css";
import Search from "./Search.jsx";
import Paginado from "./Paginado.jsx";
import Card from "./Card.jsx";
import { filterRecipesByDiet, getRecipes, getDiets, filterByName, filterByScore } from "../redux/actions.js";
import Loading from "./Loading";
import casa from "../Imagen/Home.png"



export default function Home() {
    const dispatch = useDispatch()    
    const allRecipes = useSelector((state) => state.recipes)  
    const dietAll = useSelector((state) => state.diets)
    const [currentPage, setCurrentPage] = useState(1) 
    const [recipesPerPage] = useState(9)  
    const iOfLastRecipe = currentPage * recipesPerPage      
    const iOfFirstRecipe = iOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe)   

    
    const paginado = (pageNumber) => {    
      setCurrentPage(pageNumber)
    }
  
  
    useEffect(() => {            //traigo las recetas y las dietas cuando el componente se monta.
      dispatch(getRecipes())
      dispatch(getDiets())
    }, [dispatch])              
  
    function handleClick(e) {    
      e.preventDefault()
      window.location.reload();    //resetea las recipes
    }
  
    function handleDiets(e) {
      e.preventDefault()
      dispatch(filterRecipesByDiet(e.target.value));
    }
  
    function handleOrderByName(e) {
      e.preventDefault()
      dispatch(filterByName(e.target.value))  
      setCurrentPage(1)
    }
  
  
    function handleOrderByScore(e) {
      e.preventDefault()
      dispatch(filterByScore(e.target.value))
      setCurrentPage(1)
    }
  
    return(
        <div className="Contenedor-home">
            
            <div className="header-home">
                <Link to = "/">
                    <img src={casa} width="60" height="60" alt='' className='casa'/>
                 </Link>     
                <Link className='btn-home' to="/recipes"> CREATE RECIPE </Link>
            </div>   
              

                <div className='bordercont-home'>
                    <Search />

                    <select className='select-home' onChange={(e) => handleOrderByName(e)}>
                        <option value="All">All</option>
                        <option value="asc">A to Z</option>  
                        <option value="desc">Z to A</option> 
                    </select>

                    <select className='select-home' onChange={(e) => handleOrderByScore(e)}>
                        <option value="All"> All</option>
                        <option value="high"> High score </option>
                        <option value="low"> Low score </option>
                    </select>

                    <select className='select-home' onChange={(e) => handleDiets(e)}>
                        <option value="All">All</option>
                        {dietAll?.map((diet) => (
                        <option key={diet.id} value={diet.name}> {diet.name} </option>
                        ))}
                    </select>

                    <button className='button-reset-home' onClick={e => { handleClick(e) }}>
                        RESET
                    </button>

                    {currentRecipes.length === 0 && currentRecipes ? ( 
                        <Loading/>
                        ):(  
                        <div>
                            <div className='cards-container-home'>
                                {currentRecipes?.map((el) => { 
                                    return ( 
                                        <Link className='style-link-home' key={el.id} to={`/recipes/${el.id}`}>
                                            <Card 
                                                key={el.id} 
                                                id={el.id} 
                                                name={el.name} 
                                                diet={el.diets} 
                                                image={el.image}
                                                healthScore={el.healthScore}
                                            />
                                        </Link>
                                    ) 
                                })
                                }
                            </div>

                            <div className="paginado-home">
                                <Paginado 
                                    key = {1}
                                    recipesPerPage={recipesPerPage}
                                    allRecipes={allRecipes.length}   //porque necesito un valor numerico
                                    paginado={paginado}
                                />
                            </div>
                        </div>
                    )}
                </div>
        </div>
    )
};
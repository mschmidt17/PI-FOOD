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



export default function Home() {
    const dispatch = useDispatch()    //para utilizar la constante e ir despachando mis acciones
    const allRecipes = useSelector((state) => state.recipes)  //recipes(estado en reducer) traeme en esa const todo lo que esta en el estado de recipes
    const dietAll = useSelector((state) => state.diets)
    const [currentPage, setCurrentPage] = useState(1) // lo seteo en 1 porque siempre arranco en la primer pagina
    const [recipesPerPage] = useState(9)  //cuantas recetas quiero por pagina, por estado local
    const iOfLastRecipe = currentPage * recipesPerPage      //pagina actual por cantidad de recetas por pag(indice del ultimo rec que tengo por pag)
    const iOfFirstRecipe = iOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe)   //guarda recetas por pagina -> slice toma una porcion del arreglo que le paso por parametro

    
    const paginado = (pageNumber) => {    //para el renderizado del componente
      setCurrentPage(pageNumber)
    }
  
  
    useEffect(() => {            //traigo las recetas cuando el componente se monta.
      dispatch(getRecipes())
      dispatch(getDiets())
    }, [dispatch])              //de lo que depende
  
    function handleClick(e) {    //le paso el evento..
      e.preventDefault()
      dispatch(getRecipes())   //resetea las recipes
    }
  
    function handleDiets(e) {
      e.preventDefault()
      dispatch(filterRecipesByDiet(e.target.value));
    }
  
    function handleOrderByName(e) {
      e.preventDefault()
      dispatch(filterByName(e.target.value))  //despacho la action
      setCurrentPage(1)
    }
  
  
    function handleOrderByScore(e) {
      e.preventDefault()
      dispatch(filterByScore(e.target.value))
      setCurrentPage(1)
    }
  
    return(
        <div className="Contenedor-home">
                <Link className='btn-home' to="/recipes"> CREATE RECIPE </Link>

                <div className='bordercont-home'>
                    <Search/>

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

                    {allRecipes.length > 0 ?
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
                        : <Loading/>
                    }
                </div>
        </div>
    )
};
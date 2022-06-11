import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import "../CSS/Home.css";
import NavBar from "./NavBar.jsx";
import Paginado from "./Paginado.jsx";
import Card from "./Card.jsx";
import Loading from "./Loading.jsx";



export default function Home() {
    const dispatch = useDispatch();
    const [searchError, setSearchError] = useState(false);

    //Me traigo estados globales de redux:
    const recipeAll = useSelector((state) => state.recipesAll);
    const recipes = useSelector((state) => state.recipes)

    //Seteo estados locales para el paginado: 
    const [currenPage, setcurrenPage] = useState(1);
    const [recipesPerPage] = useState(9);

    //Paginado:
    const indexOfLastRecipe = currenPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  
    const paginado = (pageNumber) => {
      setcurrenPage(pageNumber);
    };

    useEffect(() => {
        setcurrenPage(1);
    }, [dispatch])

    //Renderiza las Cards juntas y las relaciona con el paginado:
    const mostrarCards = (recipes) => {
        const currentRecipes = recipeAll.slice(indexOfFirstRecipe, indexOfLastRecipe);
        return (
          <div>
            <div className="paginado">
                {currentRecipes.length === 0 && currentRecipes ? (
                    <Loading />
                ) : (
                    currentRecipes.map((e) => {
                    return (
                        <div key={e.id}>
                            <Link to={"/recipes/" + e.id} style={{ textDecoration: 'none' }}>
                                <Card
                                    name={e.name}
                                    image={e.image}
                                    temperament={e.temperament}
                                    weight={e.weight}
                                />
                            </Link>
                        </div>
                    );
                    })
                )}
            </div>
            
              <Paginado
                recipesPerPage={recipesPerPage}
                recipeAll={recipeAll.length}
                paginado={paginado}
              />
           
          </div>
        );
    };
  
    return(
        <div className="Contenedor-home">
            <NavBar setcurrentPage={setcurrenPage} setSearchError={setSearchError}/>

            {searchError && (
                <h3 className="mensaje-error-buscador">
                {'No recipe with this name was found'}
                </h3>
            )}

            <div>
                {recipeAll.length > 0 ? mostrarCards(recipeAll) : mostrarCards(recipes)}
            </div>
        </div>
    )
};
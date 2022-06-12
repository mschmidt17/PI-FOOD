import React from "react";
import "../CSS/NavBar.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import Search from "./Search.jsx"
import { filterByDiets, getDiets, getRecipesAll, orderByName, orderByScore } from '../redux/actions.js';


export default function NavBar({setcurrenPage, setSearchError}) {
    const dispatch = useDispatch();
    const [setOrden] = useState('');
    const dietAll = useSelector((state) => state.dietsAll)

    useEffect(() => {
        dispatch(getRecipesAll());
        dispatch(getDiets());
    }, [dispatch]);

    
    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        dispatch(orderByScore(e.target.value));
        setcurrenPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    };
    
    const handleDiets = (e) => {
        e.preventDefault();
        dispatch(filterByDiets(e.target.value));
        setcurrenPage(1);
        setSearchError(false);
    };

    return(
        <div className="Contenedor-Navbar">
            <Search setSearchError={setSearchError} />
            <div className="containerNavFilter">
                <div className="">
                <label className="filtro" htmlFor="">
                    Order by Name{' '}
                </label>
                <select
                    className="input-filtro"
                    onChange={(e) => handleSort(e)}
                    name=""
                    id=""
                >
                    <option value="asc">A Z</option>
                    <option value="dsc">Z A</option>
                </select>
                </div>
                <div className="">
                <label className="filtro" htmlFor="">
                    Score{' '}
                </label>
                <select
                    className="input-filtro"
                    onChange={(e) => handleSort(e)}
                    name=""
                    id=""
                >
                    <option value="low">Low Score </option>
                    <option value="high">High Scrore</option>
                </select>
                </div>
                <div className="">
                <label className="filtro" htmlFor="">
                    Diets
                </label>
                <select
                    className="input-filtro"
                    onChange={(e) => handleDiets(e)}
                    name=""
                    id=""
                >
                    <option value="All">All</option>
                    {dietAll?.map((diet) => (
                    <option value={diet.name}>{diet.name}</option>
                    ))}
                </select>
                </div>
            </div>

            <Link to="/create">
              <button className="boton-create">Create NEW RECIPE</button>
            </Link>
        </div>
    )
};
import React from "react";
import  "../CSS/Search.css";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNameRecipes } from "../redux/actions.js";


export default function Search() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)                   //valor del input
    }

    const recipes = useSelector((state) => state.recipes)

    const handleSubmit =  (e) => {
        e.preventDefault()
        if(!name.trim()){
            return alert("Please insert a valid food name")
        } else {
            dispatch(getNameRecipes(name.trim())) 
            setName('')  
            console.log(recipes)
            if (recipes.length === 0) {
                alert ('SORRY, we couldnt find a recipe with that food')
            }
        }
    }

    return (
        <div className="contains-search">
            <input className="input-search"
                value = {name}
                type='text'
                placeholder="Recipe..."
                onChange={(e) => handleInputChange(e)}
            />
            <button className="btnSearch" type="submit" onClick={(e) => handleSubmit(e)}> SEARCH </button>
        </div>
    )
}
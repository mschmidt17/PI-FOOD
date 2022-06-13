import React from "react";
import  "../CSS/Search.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from "../redux/actions.js";


export default function Search() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)   //valor del input
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNameRecipes(name)) //el estado
        setName('')  
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
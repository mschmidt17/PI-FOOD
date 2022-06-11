import React from "react";
import "../CSS/Search.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchbyName } from '../redux/actions.js';


export default function Search({ setSearchError }) {
    const dispatch = useDispatch();
    const [setErrorInput] = useState(true);
    const [inputValue, setinputValue] = useState('');
  
    const handleChange = ({ target }) => {
      setinputValue(target.value);
      const isValidate = target.validity.valid;
      if (isValidate) {
        setErrorInput(false);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      !inputValue ? setSearchError(true) : setSearchError(false);
      dispatch(searchbyName(inputValue));
      setinputValue('');
    };


    return(
        <div className="Contenedor-search">
            <form className="form-search"  onSubmit={handleSubmit}>
                <div className="buscador">
                    <input
                        className='input-search'
                        type="text"
                        placeholder="Buscar recetas..."
                        onChange={handleChange}
                    />
                </div>
                <button className="button-search">Search</button>
            </form>
        </div>
    )
};
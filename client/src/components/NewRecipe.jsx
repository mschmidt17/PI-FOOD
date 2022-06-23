import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRecipe, getDiets } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/NewRecipe.css";



export default function NewRecipe() {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets) 
    const recipes = useSelector((state) => state.allRecipes);
    const [errors, setError] = useState({})

    const [input, setInput] = useState({
        name: "",
        summary: "",
        image: "",
        healthScore: 0,
        steps: "",
        diets: [],
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])


    function HandleDelete(el) {
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== el)
        })
    };

    const validate = (input) => {     
        let errors = {};
        if (!input.name) {
            errors.name = "The name of recipe is required";
        } else if (!input.summary) {
            errors.summary = "Summary is required";
        } else if (!input.healthScore) {
            errors.healthScore = "The health score is required";
        } else if (input.healthScore > 100) {
            errors.healthScore = "The health score has to be lower than 100";
        } else if (input.healthScore < 0) {
            errors.healthScore = "The health score has to be higher than 0";
        } else if (!input.steps) {
            errors.steps = "You should add at least one step"
        }
        return errors;
    };


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value  //va tomando el nombre de cada prop, me vaya llenando el estado
        })
        setError(                          //form
            validate({
                ...input,
                [e.target.name]: e.target.value,  
            })
        );
    }

    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name.trim()) {
            alert("Your recipe needs a name")
        } else if (recipes.find( (e) => e.name.toLowerCase() === input.name.toLowerCase())) {
            alert(`The name ${input.name} already exist, please choose another one!`) 
        }  else if (!input.summary) {
            alert("Your recipe needs a summary")
        } else if (!input.healthScore || input.healthScore < 1 || input.healthScore > 100) {
            alert("Please insert a valid healthscore")
        } else if (!input.steps) {
            alert("Please insert at least one step")
        } else if (input.diets.length === 0) {
            alert("Please add at least one diet!")
        }
        else {
            dispatch(postRecipe(input))
            alert('Receta creada con éxito')
            setInput({                            
                name: "",
                summary: "",
                image: "",
                healthScore: 0,
                steps: "",
                diet: [],
            })
            document.getElementById("formulario").reset();
            window.location.reload();
        }
    };


    return (
        <div className="contains-newrecipe">
        
            <Link to='/home'><button className="buttonHome">HOME</button></Link>

            <div className="Formulario-newrecipe">

                <h1 className="titulo-newrecipe">CREATE YOUR RECIPE!</h1>
                <form id="formulario" className="form-newrecipe" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-left">
                        <div>
                            <p>Recipe name:</p>
                            <input className="input-newrecipe"
                                type="text"
                                value={input.name}
                                name="name"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && <p className="error-controlado"> {errors.name}</p>}
                        </div>
                        <div>
                            <p>Summary:</p>
                            <textarea className="input-newrecipe"
                                type="text"
                                value={input.summary}
                            
                                name="summary"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.summary && <p className="error-controlado"> {errors.summary}</p>}
                        </div>
                        <div>
                            <div>
                                <p>Optional Image: </p>
                                <input className="input-newrecipe"
                                    type="text"
                                    value={input.image}
                                    name="image"
                                    placeholder="URL image"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div>
                            <p>Health Score:</p>
                            <input className="input-newrecipe"
                                type="number"
                                value={input.healthScore}
                        
                                name="healthScore"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.healthScore && <p className="error-controlado"> {errors.healthScore}</p>}

                        </div>
                    </div>

                    <div className="form-right">
                        <div>
                            <p>Steps:</p>
                            <textarea className="input-newrecipe"
                                type="textarea"
                                value={input.steps}
                                
                                name="steps"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.steps && <p className="error-controlado"> {errors.steps}</p>}
                        </div>
                        <div>
                            <p>Select diets:</p>
                            <select className="input-newrecipe"
                                
                                onChange={(e) => handleSelect(e)}>
                                {diets.map((d, index) => (
                                    <option key={index} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                            <ul>
                                {input.diets.map((el) => ( 
                                    <li key={el} className="list-diets"> 
                                        <div className="contains-diet-newrecipe">
                                            <p>{el.toUpperCase()}</p>
                                            <button className="delete-diet-newrecipe" onClick={() => HandleDelete(el)}>X</button>
                                    </div>
                                </li>
                                ))}
                            </ul> 
                        </div>
                        <button className="btn-create-newrecipe" type="submit">CREATE RECIPE</button>
                    </div>

                </form>
            </div>

        </div>
    );
};

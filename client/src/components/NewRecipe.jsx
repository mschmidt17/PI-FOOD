import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRecipe, getDiets } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/NewRecipe.css";


const validate = (input) => {     //por fuera
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

export default function NewRecipe() {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets) //trae
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
        e.preventDefault()
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
    };

    return (
        <div className="contains-newrecipe">
            <Link to='/home'><button className="buttonHome">BACK</button></Link>

            <form id="formulario" className="form-newrecipe"
                onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <h1>Create your recipe!</h1>
                    <p>Recipe name:</p>
                    <input className="input-newrecipe"
                        type="text"
                        value={input.name}
                        required
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && <p> {errors.name}</p>}
                </div>

                <div>
                    <p>Summary:</p>
                    <textarea className="summary"
                        type="text"
                        value={input.summary}
                        required
                        name="summary"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.summary && <p> {errors.summary}</p>}
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
                        required
                        name="healthScore"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.healthScore && <p> {errors.healthScore}</p>}

                </div>

                <div>
                    <p>Steps:</p>
                    <textarea className="steps-newrecipe"
                        type="textarea"
                        value={input.steps}
                        required
                        name="steps"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.steps && <p> {errors.steps}</p>}
                </div>

                <div>
                    <h3>Select diets </h3>
                    <select className="diets-newrecipe"
                        required
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

                <button className="btn-create-newrecipe" type="submit">Crate recipe</button>

            </form>

        </div>
    )
}

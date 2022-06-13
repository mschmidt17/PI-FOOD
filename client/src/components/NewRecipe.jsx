import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRecipe, getDiets } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import style from "../CSS/NewRecipe.css";


function validate(input) {     //por fuera
    let errors = {};
    if (!input.name) {
        errors.name = "The name of recipe is required";
    } else if (!input.summary) {
        errors.summary = "Summary is required";
    } else if (input.score > 100) {
        errors.score = "The score has to be lower than 100";
    } else if (input.healthScore > 100) {
        errors.healthScore = "The healt has to be lower than 100";
    }
    return errors;
}

export default function NewRecipe() {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets) //trae
    const [errors, setError] = useState({})

    const [input, setInput] = useState({
        name: "",
        summary: "",
        image: "",
        score: 0,
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

    }


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
        //console.log(input)
        dispatch(postRecipe(input))
        alert('Receta creada con éxito')
        setInput({                            //que matcheen con post
            name: "",
            summary: "",
            image: "",
            score: 0,
            healthScore: 0,
            steps: "",
            diet: [],

        })
        
    }

    return (
        <div className={style.contains}>
            <Link to='/home'><button className={style.buttonHome}>BACK</button></Link>
            <form className={style.form}
                onSubmit={(e) => handleSubmit(e)}>
                <div >
                    <h1>Create your recipe!</h1>
                    <p>Recipe name:</p>
                    <input className={style.input}
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
                    <textarea className={style.summary}
                        type="text"
                        value={input.summary}
                        required
                        name="summary"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.summary && <p> {errors.summary}</p>}</div>
                <div>
                    <div>
                        <p>Optional Image: </p>
                        <input className={style.input}
                            type="text"
                            value={input.image}
                            name="image"
                            placeholder="URL image"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <p>Score:</p>
                    <input className={style.input}
                        type="number"
                        value={input.score}
                        name="score"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.score && <p> {errors.score}</p>}

                </div>
                <div>
                    <p>Health Score:</p>
                    <input className={style.input}
                        type="number"
                        value={input.healthScore}
                        name="healthScore"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.healthScore && <p> {errors.healthScore}</p>}

                </div>
                <div>
                    <p>Steps:</p>
                    <textarea className={style.steps}
                        type="textarea"
                        value={input.steps}
                        name="steps"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <h3>Select diets </h3>
                <select className={style.diets}
                    onChange={(e) => handleSelect(e)}>
                    {diets.map((d, index) => (
                        <option key={index} value={d.name}>{d.name}</option>
                    ))}
                </select>
                <ul><li>{input.diets.map(el => el.toUpperCase() + ", ")}</li></ul> 
                {input.diets.map(el =>
                    <div className={style.subcontains}>
                        <p>{el}</p>
                        <button className={style.buttonDelete}
                            onClick={() => HandleDelete(el)}>X</button>
                    </div>
                )}
                <button className={style.buttonCreate}
                    type="submit">Crate recipe</button>


            </form>

        </div>
    )
}

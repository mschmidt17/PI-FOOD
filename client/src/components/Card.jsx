import React from "react";
import style from "../CSS/Card.css";



export default function Card({ name, diet, image }) {
    return (
        <div className={style.card}>
            <h3 >{name}</h3>
            {diet.map((e, index) => <h5 key={index}  className={style.diet}>{e.name}</h5>)}
            <img className={style.image} src={image} alt="img not found" />
        </div>
    
    );
}
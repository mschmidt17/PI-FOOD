import React from "react";
import "../CSS/Card.css";



export default function Card({ name, diet, image, healthScore }) {
    return (
        <div className="card-detail">
            <div className="image-card-container">
                <img className="image-card" src={image} alt="img not found" />
            </div>
            <div className="info-card">
                <h3 className="recipe-name-card" >{name}</h3>
                {diet.map((e, index) => <p key={index}  className="diet-card"> {e} </p>)}
                <p className="diet-score"> HealthScore: {healthScore} </p>
            </div>
        </div>
    
    );
}
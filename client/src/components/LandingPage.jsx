import React from "react";
import "../CSS/LandingPage.css";
import { Link } from "react-router-dom";



export default function LandingPage() {
    return(
        <div className="Contenedor-Landing">
            <h1>Bienvenidos!</h1>
            <Link to = "/Home">
                <button className="Boton-Landing"> A comer! </button>
            </Link>
        </div>
    )
};
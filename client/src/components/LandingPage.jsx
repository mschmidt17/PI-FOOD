import React from "react";
import  "../CSS/LandingPage.css";
import { Link } from "react-router-dom";




export default function LandingPage() {
    return(
        <div className="contenedorLanding">
            <div className="LandingPage">
                <p className="titulo-landingP">FOODS</p>
                <Link to = "/Home">
                    <button className="botonLanding"> Let's eat! </button>
                </Link>
            </div>
        </div>
    )
};
import React from "react";
import "../CSS/paginado.css";


export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
    const pageNumers = []

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumers.push(i)
    }

    return (
        <nav>
            <ul className="paginado-contenedor">
                {pageNumers &&
                    pageNumers.map(number => (  //renderizo los numeros por separado
                        <li key={number} className="li-paginado">
                            <button className="button-paginado" onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
            </ul>
        </nav>

    )
};
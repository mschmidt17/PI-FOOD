import React from "react";
import style from "../CSS/paginado.css";


export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
    const pageNumers = []

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumers.push(i)
    }

    return (
        <nav>
            <ul className={style.paginado}>
                {pageNumers &&
                    pageNumers.map(number => (  //renderizo los numeros por separado
                        <li key={number} className={style.li}>
                            <button className={style.button} onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
            </ul>
        </nav>

    )
};
import React from "react";
import "../CSS/paginado.css";



export default function Paginado({recipesPerPage, recipeAll, paginado}) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil(recipeAll / recipesPerPage); i++) {
      pageNumber.push(i + 1);
    }

    return (
      <div>
        <nav>
          <ul className="contenedor-paginado">
            {pageNumber &&
              pageNumber.map((number) => (
                <li className="lista-paginado" key={number}>
                  <button className="numero-paginado" onClick={() => paginado(number)}>
                    {number}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    );
}
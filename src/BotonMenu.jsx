import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const Botonmenu = ({ item, onInputChange }) => {
  function obtenerParametro(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
  }

  const valorVariable = obtenerParametro('id');

  const [inputvalue, setInputvalue] = useState(item);

  const url = localStorage.getItem("urlinicio");

  const onsubmit = () => {
    onInputChange(inputvalue);
  };

  return (
    <>
      <Link className='Link' to={url}>
        <button onClick={onsubmit} className='boton-menu'><div className='barrita'></div> <h3 style={{ color: 'black', fontWeight: '400' }}>{inputvalue}</h3> </button>
      </Link>
    </>
  )
}

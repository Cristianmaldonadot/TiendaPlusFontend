import React, { useState } from 'react'
import reactLogo from './assets/shoppingcart_80945.svg'
import { Link } from 'react-router-dom';

export const Carrito = ( {contador} ) => {

  function obtenerParametro(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
  }

  const valorVariable = obtenerParametro('id');
  //const url = '/carrito?id='+valorVariable;

  return (
    <>  
        <div className='carrito'>
        <Link className='link' to={`/carrito`}>
            <img src={reactLogo} alt="Logo React" />
          </Link>
          <div className='carrito-container-contador'>
            <span>{contador}</span>
          </div>
        </div>
        
    </>
    
  )
}

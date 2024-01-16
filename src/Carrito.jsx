import React, { useState } from 'react'
import reactLogo from './assets/shoppingcart_80945.svg'

export const Carrito = ( {contador} ) => {

  function obtenerParametro(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
  }

  const valorVariable = obtenerParametro('id');
  const url = 'carrito?id='+valorVariable;

  return (
    <>  
        <div className='carrito'>
          <a href={url}>
            <img src={reactLogo} alt="Logo React" />
          </a>
          <span>{contador}</span>
        </div>
        
    </>
    
  )
}

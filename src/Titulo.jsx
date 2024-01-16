import React from 'react'
import logotiendaplus from './assets/logotiendaplus.svg'

export const Titulo = () => {

  function obtenerParametro(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
  }

  const valorVariable = obtenerParametro('id');
  const url = '/?id='+valorVariable;

  return (
    <>
        <div className='title'>
            <a href={url}>
                <img src={logotiendaplus} alt="Logo Tienda" />
            </a>
        </div>
    </>
  )
}

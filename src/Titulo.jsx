import React from 'react'
import logotiendaplus from './assets/logotiendaplus.svg'
import { Link } from 'react-router-dom';

export const Titulo = () => {


  const url = localStorage.getItem("urlinicio");

  return (
    <>
      <div className='title'>
        <a href="/">
          <img src={logotiendaplus} alt="Logo Tienda" />
        </a>
      </div>
    </>
  )
}

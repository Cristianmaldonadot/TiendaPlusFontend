import React, { useEffect, useState } from 'react'
import './botonMiCuenta.css';
import arrowRigth from './assets/arrow-rigth.svg'
import { Link } from 'react-router-dom';

export const BotonMiCuenta = ({ icono, title, cambiarbtn, linkTo}) => {

  return (
    <>
      {
        cambiarbtn ?
          (
            <div className='caja-boton-micuenta'>
              <Link to={linkTo}>
                <button className='boton-micuenta'>
                  <div className='boton-micuenta-icon'>
                    <img style={{ width: '100%' }} src={icono} alt="" />
                  </div>
                  <div className='boton-micuenta-title'>
                    <h2 style={{ color: 'black', fontWeight: '400', fontSize: '18px' }}>{title}</h2>
                    <img style={{ width: '12px' }} src={arrowRigth} alt="" />
                  </div>
                </button>
              </Link>
            </div >
          )
          :
          (
            <div style={{ backgroundColor: '#D8D8D8' }} className='caja-boton-micuenta'>
              <div className='boton-micuenta-franja'></div>
              <div className='boton-micuenta-icon'>
                <img style={{ width: '100%' }} src={icono} alt="" />
              </div>
              <div className='boton-micuenta-title' style={{ width: '233px' }}>
                <h2 style={{ color: 'black', fontWeight: '400', fontSize: '18px' }}>{title}</h2>
                <img style={{ width: '12px' }} src={arrowRigth} alt="" />
              </div>
            </div >
          )
      }

    </>
  )
}

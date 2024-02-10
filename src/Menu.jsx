import React, { useState } from 'react'
import arrow from './assets/arrow-down.svg'

export const Menu = ({onCambio}) => {

  const [mostrarMenubar, setMostrarMenubar] = useState(false)

  const handleMenuBar = ()=>{
    const nuevoValor = true
    setMostrarMenubar(nuevoValor);
    onCambio(nuevoValor);
  }

  return (
    <>
        <div className='menu-side'>
            <button onClick={handleMenuBar} className='boton'>
                <div>Menu</div>
                <img src={arrow} alt="" />
            </button>
        </div>
    
    </>
  )
}

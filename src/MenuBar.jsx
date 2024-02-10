import React, { useEffect, useState } from 'react'
import { Botonmenu } from './Botonmenu'
import { useSpring, animated } from 'react-spring';
import logotiendaplus from './assets/logotiendaplus.svg'

export const MenuBar = ({ cerrarventana, nuevoValorFilter }) => {

  const props = useSpring({
    opacity: 1,
    transform: 'translateX(0)',
    from: { opacity: 0, transform: 'translateX(-100%)' },
  });

  const categorias = ['Computo', 'TV', 'Videojuego', 'Tecnologia', 'Celular', 'Camping',
    'Mujer', 'Hombre', 'Electrodomesticos', 'Zapatos', 'Decoración', 'Construccion'];

  document.body.classList.add('no-scroll');

  const cerrarModal = () => {
    document.body.classList.remove('no-scroll');
    cerrarventana(false);
  }
  const inputfilter = (valorFilter) => {
    nuevoValorFilter(valorFilter)
    document.body.classList.remove('no-scroll');
    cerrarventana(false);
  }

  return (
    <>
      <div onClick={cerrarModal} className={'fondo-modal-login'}>
      </div>
      <animated.div style={props} className='menu'>
        <div className='barra-superior' style={{ width: '320px', height: '5px', backgroundColor: 'darkslateblue' }}></div>
        <div className='barra-cerrar'>
          <img style={{width:'190px', marginLeft:'15px'}} src={logotiendaplus} alt="" />
          <button onClick={cerrarModal} className='boton-cerrar-menubar' >X</button>
        </div>
        <div className='barra-items'>
          {categorias.map((cat) => (
            <Botonmenu key={cat} value={cat} item={cat} onInputChange={inputfilter}></Botonmenu>
          ))}
        </div>
      </animated.div>
    </>
  )
}

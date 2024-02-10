import React, { useEffect, useState } from 'react'
import { ModalLogin } from './ModalLogin';
import { MenuIniciaSesion } from './MenuIniciaSesion';

export const IniciarSesion = () => {

  const [mostrarDiv2, setMostrarDiv2] = useState(false);

  const manejarHover = () => {
    setMostrarDiv2(true);
  };

  const manejarSalida = () => {
    setMostrarDiv2(false);
  };

  const cerrarMenuInciaSesion = () =>{
    setMostrarDiv2(false);
  }

  const [usuario, setUsuario] = useState("Inicia Sesión")
  const [botonDesactivado, setBotonDesactivado] = useState(false);

  const desactivarButton = () => {
    if (localStorage.getItem('usuario')) {
      setBotonDesactivado(true);
    }
  }

  const mostrarUsuario = () => {
    if (localStorage.getItem('usuario')) {
      const usuario = localStorage.getItem('usuario')
      setUsuario(usuario.charAt(0).toUpperCase() + usuario.slice(1));
    } else {
      setUsuario('Inicia Sesión');
    }
  }

  useEffect(() => {
    // Actualizar el contador al cargar la página
    mostrarUsuario();
    desactivarButton();
  }, []);

  return (
    <>
      <div className='div-inicia-sesion' onMouseOver={manejarHover} onMouseOut={manejarSalida}>
        <div className='boton-inicia-sesion' disabled={botonDesactivado} >
          <h4>Hola,</h4>
          <h2 style={{ fontSize: '28px' }}>{usuario}</h2>

          <div className='div-boton-inicia-sesion'>
            {
              mostrarDiv2 && (<MenuIniciaSesion cerrarMenuInciaSesion={cerrarMenuInciaSesion}></MenuIniciaSesion>)
            }

          </div>
        </div>

      </div>
      {
        mostrarDiv2 && (<div className='fondo-modal-gris'></div>)
      }
    </>

  )
}

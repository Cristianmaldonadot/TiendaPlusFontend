import React, { useEffect, useState } from 'react'
import { ModalLogin } from './ModalLogin';

export const IniciarSesion = () => {

  const [mostrarLogin, setMostrarLogin] = useState(false)
  const [usuario, setUsuario] = useState("Inicia Sesión")
  const [botonDesactivado, setBotonDesactivado] = useState(false);

  const desactivarButton = () =>{
    if(localStorage.getItem('usuario')){
      setBotonDesactivado(true);
    }
  }

  const handleClick = () => {
    setMostrarLogin(!mostrarLogin); // Cambiar el estado al hacer clic
  };

  const mostrarUsuario = () =>{
    if(localStorage.getItem('usuario')){
      const usuario = localStorage.getItem('usuario')
      setUsuario(usuario);
    }else{
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
      <div>
        <div>
          <button onClick={handleClick} className='boton-inicia-sesion' disabled={botonDesactivado} >
            <h2>Hola,<div>{usuario}</div></h2>  
          </button>
          {
            mostrarLogin && (<ModalLogin cerrarventana={handleClick} ></ModalLogin>)
          }
        </div>
      </div>
    </>
    
  )
}

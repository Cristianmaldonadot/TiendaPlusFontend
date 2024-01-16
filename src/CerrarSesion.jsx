import React from 'react'

export const CerrarSesion = () => {

  function obtenerParametro(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
  }

  const valorVariable = obtenerParametro('id');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    redirigirAIndex();
  }

  const redirigirAIndex = () => {
    window.location.href = `/?id=${valorVariable}`;
  };

  return (
    <>
      <div>
        <button onClick={handleLogout} className='boton-inicia-sesion'>
          <h2>Cerrar Sesión</h2>
        </button>
      </div>

    </>
  )
}

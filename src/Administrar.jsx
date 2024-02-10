import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useObtenerIdUsuario } from './hooks/useObtenerIdUsuario';

export const Administrar = () => {

  const history = useNavigate();

  const [usuario, setUsuario] = useState('');

  const nombreusuario = localStorage.getItem('usuario')

    const obtenerIdUsuario = async () => {
        const idusuario = await useObtenerIdUsuario(nombreusuario);
        setUsuario(idusuario);
    }
  
  const redirigirAIndex = () => {
    history(`/partner/?id=${usuario}`);
  };
  
  useEffect(() => {
    obtenerIdUsuario();
  }, []);

  return (
    <>
      <div className='div-administrar'>
        <button onClick={redirigirAIndex} className='boton-inicia-sesion' style={{width:'200px'}}>
          <h2 style={{fontSize:'22px', fontWeight:'600'}}>Mi Catalogo</h2>
        </button>
      </div>

    </>
  )
}

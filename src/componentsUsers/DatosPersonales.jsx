import React, { useEffect, useRef, useState } from 'react'
import { useFetchObtenerUsuarioAll } from '../hooks/useFetchObtenerUsuarioAll';
import { useFetchActualizarDatosUsuario } from '../hooks/useFetchActualizarDatosUsuario';

export const DatosPersonales = ({enviarIndexBoton}) => {


  const nombreusuario = localStorage.getItem('usuario')

  const obtenerDirecciones = async () => {
    const fetchdata = await useFetchObtenerUsuarioAll(nombreusuario);
    setDocidentidad(fetchdata.docidentidad)
    setCelular(fetchdata.celular)
    setEmail(fetchdata.email)
    setId(fetchdata.idusuario)
    setnombre(fetchdata.nombre)
    setApPaterno(fetchdata.appaterno)
    setApMaterno(fetchdata.apmaterno)

  }

  const [id, setId] = useState(' ')

  const [nombre, setnombre] = useState(' ')
  const handleNombreChange = (event) => {
    setnombre(event.target.value);
  }
  const [apPaterno, setApPaterno] = useState(' ')
  const handleApPaternoChange = (event) => {
    setApPaterno(event.target.value);
  }
  const [apMaterno, setApMaterno] = useState(' ')
  const handleApMaternoChange = (event) => {
    setApMaterno(event.target.value);
  }
  const [docidentidad, setDocidentidad] = useState(' ')
  const handleDocIdentChange = (event) => {
    setDocidentidad(event.target.value);
  }
  const [celular, setCelular] = useState(' ')
  const handleCelularChange = (event) => {
    setCelular(event.target.value);
  }
  const [email, setEmail] = useState(' ')
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await useFetchActualizarDatosUsuario(id, nombre, apPaterno, apMaterno, docidentidad, celular, email);

    alert("Datos Actualizados");
  }

  useEffect(() => {
    obtenerDirecciones();
    enviarIndexBoton(0);
  }, []);

  return (
    <>
        <div className='micuenta-content-page-datospersonales'>
          <h1 style={{ fontWeight: '500' }}>Datos Personales</h1>

          <div className='page-datospersonales-div'>
            <div className='page-datospersonales-labelinput'>
              <label>Nombre</label>
              <input className='input-page-datospersonales' type="text" value={nombre} onChange={handleNombreChange} />
            </div>
            <div className='page-datospersonales-labelinput'>
              <label>Apellido Paterno</label>
              <input className='input-page-datospersonales' type="text" value={apPaterno} onChange={handleApPaternoChange} />
            </div>
            <div className='page-datospersonales-labelinput'>
              <label>Apellido Materno</label>
              <input className='input-page-datospersonales' type="text" value={apMaterno} onChange={handleApMaternoChange} />
            </div>
          </div>
          <div className='page-datospersonales-div'>
            <div className='page-datospersonales-labelinput'>
              <label>Documento Identidad</label>
              <input className='input-page-datospersonales' type="text" value={docidentidad} onChange={handleDocIdentChange} readOnly />
            </div>
            <div className='page-datospersonales-labelinput'>
              <label>Celular</label>
              <input className='input-page-datospersonales' type="text" value={celular} onChange={handleCelularChange} />
            </div>
            <div className='page-datospersonales-labelinput'>
              <label>E-mail</label>
              <input className='input-page-datospersonales' type="text" value={email} onChange={handleEmailChange} readOnly />
            </div>
          </div>
          <div className='page-datospersonales-div' >
            <button style={{ height: '50px' }} onClick={handleSubmit} className='boton-registrarse'>Guardar</button>
          </div>
        </div>
    </>
  )
}

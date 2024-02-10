import React, { useEffect, useRef, useState } from 'react'
import { IconButton, InputAdornment } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFetchActualizarContrasena } from '../hooks/useFetchActualizarContrasena';

export const CambiarContrasena = ({ enviarIndexBoton }) => {

  const [isValid, setIsValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const idUsuario = localStorage.getItem('idurl')

  const [id, setId] = useState(idUsuario)

  const [passwordOld, setPasswordOld] = useState(``)
  const handlePasswordOldChange = (event) => {
    setPasswordOld(event.target.value);
  }

  const [passwordNew, setPasswordNew] = useState(``)
  const handlePasswordNewChange = (event) => {
    const inputValue = event.target.value;

    const isValidPassword = /^(?=.*\d).{6,}$/.test(inputValue);

    setPasswordNew(inputValue);
    setIsValid(isValidPassword);
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid) {

      const data = await useFetchActualizarContrasena(id, passwordOld, passwordNew);

      alert(data);
      setPasswordOld(``)
      setPasswordNew(``)
      setIsValid(false)
    } else {
      // Si no cumple, mostrar un mensaje de error o realizar otra acción
      alert("La contraseña no cumple con los requisitos.");
    }
  }

  useEffect(() => {
    enviarIndexBoton(1);
  }, []);

  return (
    <>
      <div className='micuenta-content-page-datospersonales'>
        <h1 style={{ fontWeight: '500' }}>Cambiar Contraseña</h1>

        <div className='page-datospersonales-div'>
          <div className='page-datospersonales-labelinput'>
            <label>Contraseña Actual</label>
            <input className='input-page-datospersonales' type={showPassword ? 'text' : 'password'} value={passwordOld} onChange={handlePasswordOldChange}
              placeholder='Ingrese tu contraseña actual' />
            <InputAdornment style={{ width: '30px', height: '50px', display: 'flex', position: 'absolute', top: '25px', right: '0px' }} position="end">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          </div>

        </div>
        <div className='page-datospersonales-div'>
          <div className='page-datospersonales-labelinput'>
            <label>Contraseña Nueva</label>
            <input className='input-page-datospersonales' type={showPassword2 ? 'text' : 'password'} value={passwordNew} onChange={handlePasswordNewChange}
              placeholder='Ingrese tu nueva contraseña' />
            <InputAdornment style={{ width: '30px', height: '50px', display: 'flex', position: 'absolute', top: '25px', right: '0px' }} position="end">
              <IconButton onClick={handleTogglePasswordVisibility2} edge="end">
                {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
            <div className='mostrar-mensaje'>
              <div style={isValid ? { width: '15px', height: '12px', backgroundColor: '#29C104', margin: '15px', borderRadius: '25px' } : { width: '15px', height: '12px', backgroundColor: 'gray', margin: '15px', borderRadius: '25px' }}></div>
              <p style={isValid ? { fontSize: '11px', color: '#29C104' } : { fontSize: '11px', color: 'gray' }}>La contraseña debe tener min. 6 caracteres y al menos un número.</p>
            </div>
          </div>
        </div>

        <div className='page-datospersonales-div' >
          <button style={{ height: '50px' }} onClick={handleSubmit} className='boton-registrarse'>Guardar</button>
        </div>
      </div>
    </>
  )
}

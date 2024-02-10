import React, { useCallback, useEffect, useState } from 'react';
import './miCuenta.css';
import { BotonMiCuenta } from './BotonMiCuenta';
import iconoUser from './assets/user.svg';
import iconoLock from './assets/lock.svg';
import iconoCard from './assets/cardcredit.svg';
import iconoHome from './assets/home.svg';
import iconoBuy from './assets/buy.svg';
import iconoUserBig from './assets/userbig.svg';
import iconoAdd from './assets/plus3.svg';
import { Route, Routes } from 'react-router-dom';
import { DatosPersonales } from './componentsUsers/DatosPersonales';
import { Direcciones } from './componentsUsers/Direcciones';
import { useVerifyUser } from './hooks/useVerifyUser';
import { MediosPago } from './componentsUsers/MediosPago';
import { CambiarContrasena } from './componentsUsers/CambiarContrasena';
import { MisCompras } from './componentsUsers/MisCompras';
import { useFetchObtenerUsuarioAll } from './hooks/useFetchObtenerUsuarioAll';
import { ModalAvatar } from './ModalAvatar';
import avatar5 from './assets/avatares/avat05.svg'
import { useObtenerAvatares } from './hooks/useObtenerAvatares';

const botones = [
  { icono: iconoUser, title: 'Datos Personales', linkto: 'datospersonales' },
  { icono: iconoLock, title: 'Cambiar Contraseña', linkto: 'cambiarcontrasena' },
  { icono: iconoBuy, title: 'Mis Compras', linkto: 'miscompras' },
  { icono: iconoHome, title: 'Direcciones', linkto: 'direcciones' },
  { icono: iconoCard, title: 'Medios de Pago', linkto: 'mediospago' },
];

export const MiCuenta = () => {

  const [yaCargado, setyaCargado] = useState(false)

  const [avatares, setavatares] = useState([])

  const obtenerAvatares = () => {
    const obtenerAvatares = useObtenerAvatares();
    setavatares(obtenerAvatares)
  }

  const [mostrarModalAvatar, setMostrarModalAvatar] = useState(false)

  const handleClick = () => {
    setMostrarModalAvatar(!mostrarModalAvatar);
    obtenerAvatar()
  };

  const [indexBoton, setindexBoton] = useState(0)

  const [avatar, setAvatar] = useState(5)

  const verifyUser = useVerifyUser();
  const [botonesEstado, setBotonesEstado] = useState(Array(botones.length).fill(true));

  const handleButtonClick = (index) => {
    const nuevosEstados = botonesEstado.map((estado, i) => (i === index ? false : true));
    setBotonesEstado(nuevosEstados);
  };

  const setearIndexBoton = (valor) => {
    setindexBoton(valor);
    console.log("Este es el valor en setear", valor);
  };

  const [usuario, setUsuario] = useState("Inicia Sesión")

  const mostrarUsuario = () => {
    if (localStorage.getItem('usuario')) {
      const usuario = localStorage.getItem('usuario')
      setUsuario(usuario.charAt(0).toUpperCase() + usuario.slice(1));
    } else {
      setUsuario('Inicia Sesión');
    }
  }

  const obtenerAvatar = async () => {
    const { avatares } = await useFetchObtenerUsuarioAll(localStorage.getItem('usuario'))
    if (avatares.length > 0) {
      const { imagen } = avatares[0];
      setAvatar(imagen)
      console.log("este es el valor del avatar", avatar)
      setyaCargado(true)
    }else{
      setyaCargado(true)
    }

  }

  useEffect(() => {
    handleButtonClick(indexBoton);
    console.log("este es el valor del indexboton", indexBoton)
    mostrarUsuario();
    obtenerAvatares();
    obtenerAvatar();
  }, [indexBoton]);

  return (
    <>
      {verifyUser && (
        <div className='micuenta-contenido'>
          <div className='micuenta-title'>
            <div style={{position:'relative'}} className='micuenta-title-icon'>
              <img onClick={handleClick} style={{cursor:'pointer', width:'30px', position:'absolute', right:'0'}} src={iconoAdd} alt="iconoPlus" />
              {
                yaCargado && (<img style={{ width: '100%', fill: '#FFFFFF' }} src={avatar === 5 ? iconoUserBig : avatares[avatar - 1].avatar} alt='' />)
              }
            </div>
            <div className='micuenta-title-nombre'>
              <h1 style={{ margin: '5px', fontSize: '25px', fontWeight: '400' }}>HOLA</h1>
              <h1 style={{ margin: '0px', fontSize: '35px' }}>{usuario}</h1>
            </div>
          </div>
          <div className='micuenta-content'>
            <div className='micuenta-content-bar'>
              {botones.map((boton, index) => (
                <BotonMiCuenta
                  key={index}
                  icono={boton.icono}
                  title={boton.title}
                  linkTo={boton.linkto}
                  cambiarbtn={botonesEstado[index]}
                />
              ))}
            </div>
            <div className='micuenta-content-page'>
              <Routes>
                <Route path="/datospersonales" element={<DatosPersonales enviarIndexBoton={(valor) => setearIndexBoton(valor)} ></DatosPersonales>} />
                <Route path="/cambiarcontrasena" element={<CambiarContrasena enviarIndexBoton={(valor) => setearIndexBoton(valor)} ></CambiarContrasena>} />
                <Route path="/miscompras" element={<MisCompras enviarIndexBoton={(valor) => setearIndexBoton(valor)} ></MisCompras>} />
                <Route path="/direcciones" element={<Direcciones enviarIndexBoton={(valor) => setearIndexBoton(valor)} ></Direcciones>} />
                <Route path="/mediospago" element={<MediosPago enviarIndexBoton={(valor) => setearIndexBoton(valor)} ></MediosPago>} />
              </Routes>
            </div>
          </div>
          {
            mostrarModalAvatar && (<ModalAvatar cerrarventana={handleClick} ></ModalAvatar>)
          }
        </div>
      )}
    </>
  );
};

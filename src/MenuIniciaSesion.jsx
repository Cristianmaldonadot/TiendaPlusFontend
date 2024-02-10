import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const MenuIniciaSesion = ({cerrarMenuInciaSesion}) => {

    const [sesioniniciada, setSesioniniciada] = useState(false)

    function obtenerParametro(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    const handleCerrarMenu = ()=>{
        cerrarMenuInciaSesion();
    }

    const valorVariable = obtenerParametro('id');

    const verificarSession = () => {
        if (localStorage.getItem('usuario')) {
            setSesioniniciada(true);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        redirigirAIndex();
    }

    const url = localStorage.getItem("urlinicio");

    const redirigirAIndex = () => {
        window.location.href = url;
    };

    useEffect(() => {
        verificarSession();
    }, []);


    return (
        <div className='menu-inicia-sesion'>
            <div className='boton-menu-inicio-sesion'>
                <div>
                    {
                        sesioniniciada ? (<a onClick={handleLogout} className='link' >Cerrar Sesión</a>)
                            : (<Link className='link' to={`/iniciar_sesion`}>Iniciar Sesión</Link>)
                    }
                </div>
            </div>
            <div className='boton-menu-inicio-sesion'>
                <div>
                    {
                        sesioniniciada ? (<Link onClick={handleCerrarMenu} className='link' to={`/miCuenta/datospersonales`}>Mi Cuenta</Link>)
                            : (<Link className='link' to={`/registrate`}>Registrarse</Link>)
                    }

                </div>
            </div>
        </div>
    )
}

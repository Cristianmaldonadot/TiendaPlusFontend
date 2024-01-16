import React, { useState } from 'react'
import logotiendaplus from './assets/logotiendaplus.svg'
import { useFetchLogin } from './hooks/useFetchLogin';

export const ModalLogin = ({ cerrarventana }) => {

    document.body.classList.add('no-scroll');

    const cerrarModal = () => {
        document.body.classList.remove('no-scroll');
        cerrarventana(false);
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { token, usuario } = await useFetchLogin(username, password);

            if (token) {
                // Guardar el token en el localStorage o realizar otras acciones según tus necesidades
                localStorage.setItem('token', token);
                localStorage.setItem('usuario', usuario);
                console.log('Token guardado en localStorage:', token);

                // Redirigir o realizar otras acciones según tus necesidades
                redirigirAIndex();
            }
        } catch (error) {
            // Manejar errores
            console.error('Error en la autenticación:', error);
        }
    }

    function obtenerParametro(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    const valorVariable = obtenerParametro('id');

    const redirigirAIndex = () => {
        window.location.href = `/?id=${valorVariable}`;
    };

    return (

        <>
            <div className='modal-contenedor'>
                <div onClick={cerrarModal} className='fondo-modal-login'>
                </div>
                <div className='modal'>
                    <div className='modal-container'>
                        <button onClick={cerrarModal} className='boton-cerrar' >X</button>
                        <div className='modal-login-boton'>
                            <img src={logotiendaplus} alt="logo" />
                        </div>
                        <h2>Hola Inicia Sesión para Comprar</h2>
                        <form onSubmit={handleSubmit}>
                            <label >Usario</label>
                            <input className='modal-input' type="text" value={username} onChange={handleUsernameChange} />
                            <label >Contraseña</label>
                            <input className='modal-input' type="password" value={password} onChange={handlePasswordChange} />
                            <button className='boton-carrito'>Ingresar</button>
                        </form>
                        <h4>ó Registrate <a href=''>aqui</a></h4>
                    </div>
                </div>
            </div>
        </>


    )
}

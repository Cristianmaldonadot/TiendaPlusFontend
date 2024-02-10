import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logotiendaplus from './assets/logotiendaplus.svg'
import { useFetchRegistrarUsuario } from './hooks/useFetchRegistrarUsuario';

export const ModalRegistro = () => {

    document.body.classList.add('no-scroll');

    function obtenerParametro(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    const valorVariable = obtenerParametro('id');

    const history = useNavigate();

    const cerrarModal = () => {
        document.body.classList.remove('no-scroll');
        redirigirAIndex();
    }

    const [username, setUsername] = useState('');
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const [docidentidad, setDocidentidad] = useState('');
    const handleDocidentidadChange = (event) => {
        setDocidentidad(event.target.value);
    }
    const [celular, setCelular] = useState('');
    const handleCelularChange = (event) => {
        setCelular(event.target.value);
    }
    const [email, setEmail] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const [password, setPassword] = useState('');
    const handlePaswordChange = (event) => {
        setPassword(event.target.value);
    }
    const [roles, setRoles] = useState('USER');
    const handleRolesChange = (event) => {
        setRoles(event.target.value);
    }
    //const [direccion, setDireccion] = useState(['Jr. Union 670', 'Av Lima 542' ]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await useFetchRegistrarUsuario(username, docidentidad, celular,  email, password, roles);

        alert(data);
        redirigirAIndex();
    }

    const url = localStorage.getItem("urlinicio");

    const redirigirAIndex = () => {
        window.location.href = url;
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
                        <div className='modal-registrate-titulo'>
                            <h2>Registrate</h2>
                        </div>
                        <form onSubmit={handleSubmit} className='form-registrarse'  >
                            <div className='agregar-productos'>
                                <label >Usuario</label>
                                <input className='modal-input-registrarse' type="text" value={username} onChange={handleUsernameChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >Doc. Identidad</label>
                                <input className='modal-input-registrarse' type="text" value={docidentidad} onChange={handleDocidentidadChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >Celular</label>
                                <input className='modal-input-registrarse' type="text" value={celular} onChange={handleCelularChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >E-mail</label>
                                <input className='modal-input-registrarse' type="email" value={email} onChange={handleEmailChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >Password</label>
                                <input className='modal-input-registrarse' type="password" value={password} onChange={handlePaswordChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >Rol</label>
                                <input className='modal-input-registrarse' type="text" value={roles} onChange={handleRolesChange} />
                            </div>
                            <button className='boton-registrarse'>Registrarse</button>
                        </form>
                        <h4>ó Registrate aqui</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

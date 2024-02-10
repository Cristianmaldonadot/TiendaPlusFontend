import React, { useEffect, useState } from 'react'
import { useObtenerIdUsuario } from './hooks/useObtenerIdUsuario';
import { useObtenerAvatares } from './hooks/useObtenerAvatares';
import { useFetchGuardarAvatar } from './hooks/useFetchGuardarAvatar';

export const ModalAvatar = ({ cerrarventana }) => {


    const [avatares, setavatares] = useState([])

    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const obtenerAvatares = () => {
        const obtenerAvatares = useObtenerAvatares();
        setavatares(obtenerAvatares)
    }

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const nombreusuario = localStorage.getItem('usuario')

    const obtenerIdUsuario = async () => {
        const idusuario = await useObtenerIdUsuario(nombreusuario);
        console.log("aca esta", idusuario);
        setUsuario(idusuario);
    }

    //document.body.classList.add('no-scroll');

    const cerrarModal = () => {
        document.body.classList.remove('no-scroll');
        cerrarventana(false);
    }

    const [usuario, setUsuario] = useState('');



    const guardarAvatar = async () => {
        if (!selectedAvatar) {
            alert('Selecciona un avatar antes de guardar.');
            return;
        }

        const data = await useFetchGuardarAvatar(usuario, selectedAvatar);

        //alert(data);
        cerrarModal();
    }

    const url = localStorage.getItem("urlinicio");

    const redirigirAIndex = () => {
        window.location.href = '/miCuenta/datospersonales';
    };


    useEffect(() => {
        obtenerIdUsuario();
        obtenerAvatares()
    }, [])



    return (

        <>
            <div className='modal-contenedor'>
                <div onClick={cerrarModal} className='fondo-modal-login'>
                </div>
                <div className='modal-agregar-productos'>
                    <div className='modal-container'>
                        <div className='div-cerrar'>
                            <button onClick={cerrarModal} className='boton-cerrar' >X</button>
                        </div>
                        <div className='div-title'>
                            <h2>Agregar Avatar</h2>
                        </div>

                        <div className='contenedor-avatares'>
                            {
                                avatares.map((avatar) => (
                                    <div className='item-avatar' key={avatar.id}>
                                        <img style={{ width: selectedAvatar === avatar ? '50px' : '70px', borderRadius: '35px', cursor: 'pointer', border: selectedAvatar === avatar ? '4px solid green' : 'none' }}

                                            src={avatar.avatar}
                                            onClick={() => handleAvatarClick(avatar)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='div-boton'>
                        <button onClick={guardarAvatar} className='boton-agregar-avatar'>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}



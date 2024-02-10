import React, { useEffect, useState } from 'react'
import { useFetchObtenerDireccionUsuario } from '../hooks/useFetchObtenerDireccionUsuario'
import { useFetchActualizarDireccionUsuario } from '../hooks/useFetchActualizarDireccionUsuario'
import { useFetchEliminarDireccion } from '../hooks/useFetchEliminarDireccion'
import { useNavigate } from 'react-router-dom'

export const Direcciones = ({ enviarIndexBoton }) => {

    const idUsuario = localStorage.getItem('idurl')

    const navigate = useNavigate();

    const [id, setId] = useState(idUsuario)

    const [direccion, setdireccion] = useState([])

    const handleDireccionChange = (event) => {
        setdireccion(event.target.value);
    }

    const nombreusuario = localStorage.getItem('usuario')

    const [direcciones, setDirecciones] = useState([])

    const obtenerDirecciones = async () => {
        const direccionesArray = await useFetchObtenerDireccionUsuario(nombreusuario);
        //console.log("aca esta", direccionesArray);
        setDirecciones(direccionesArray);
    }

    const handleDeleteDireccion = async (idDireccion) => {

        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta dirección?");

        if (!confirmacion) {
            return;
        }

        const data = await useFetchEliminarDireccion(id, idDireccion);

        alert("Direccion Eliminada");

        obtenerDirecciones();

        navigate('/miCuenta/direcciones', { replace: true });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await useFetchActualizarDireccionUsuario(id, direccion);

        alert("Datos Actualizados");

        setdireccion('');

        obtenerDirecciones();

        navigate('/miCuenta/direcciones', { replace: true });
    }

    useEffect(() => {
        obtenerDirecciones();
        enviarIndexBoton(3);
    }, []);
    return (
        <>
            <div className='micuenta-content-page-direcciones'>
                <h1 style={{ fontWeight: '500' }}>Direcciones</h1>
                <div className='direccion-content'>
                    {
                        direcciones.map((direccion) => (
                            <div className='direccion-div'
                                key={direccion.id}
                            >
                                <h3 style={{ marginLeft: '20px', fontWeight: '400' }}>{direccion.nombre}</h3>
                                <div style={{ width: '80px', height: '30px', marginRight: '20px' }}>
                                    <button style={{ fontWeight: '400', fontSize: '15px', borderRadius: '25px' }}
                                        onClick={() => handleDeleteDireccion(direccion.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    }
                    <div className='agregar-direccion'>
                        <label>Nueva Direccion: </label>
                        <input style={{ width: '300px' }} type="text" value={direccion} onChange={handleDireccionChange} />
                        <button style={{ height: '50px', fontSize: '19px' }} onClick={handleSubmit} className='boton-registrarse'>Agregar Direccion</button>
                    </div>
                </div>
            </div>
        </>
    )
}

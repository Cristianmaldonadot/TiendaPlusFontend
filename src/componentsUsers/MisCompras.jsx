import React, { useEffect, useRef, useState } from 'react'
import { useFetchObtenerUsuarioAll } from '../hooks/useFetchObtenerUsuarioAll';
import { useFetchActualizarDatosUsuario } from '../hooks/useFetchActualizarDatosUsuario';
import { useFetchObtenerDireccionUsuario } from '../hooks/useFetchObtenerDireccionUsuario';
import { useFetchObtenerComprasUsuario } from '../hooks/useFetchObtenerComprasUsuario';

export const MisCompras = ({ enviarIndexBoton }) => {
    const idUsuario = localStorage.getItem('idurl')


    const [id, setId] = useState(idUsuario)

    const [direccion, setdireccion] = useState([])

    const handleDireccionChange = (event) => {
        setdireccion(event.target.value);
    }

    const nombreusuario = localStorage.getItem('usuario')

    const [compras, setCompras] = useState([])

    const obtenerDirecciones = async () => {
        const comprasArray = await useFetchObtenerComprasUsuario(nombreusuario);
        //console.log("aca esta", direccionesArray);
        setCompras(comprasArray);
    }



    useEffect(() => {
        obtenerDirecciones();
        enviarIndexBoton(2);
    }, []);
    return (
        <>
            <div className='micuenta-content-page-direcciones'>
                <h1 style={{ fontWeight: '500' }}>Mis Compras</h1>
                <div className='micompra-content'>
                    {
                        compras.map((compra) => (
                            <div className='miscompras-div'
                                key={compra.idcompra}
                            >
                                <div>
                                    <h3 style={{ marginLeft: '20px', fontWeight: '400' }}>Compra Nº : {compra.idcompra}</h3>
                                    <h3 style={{ marginLeft: '20px', fontWeight: '600' }}>Fecha Entrega : {compra.fechaentrega}</h3>
                                </div>
                                <div style={{ width: '250px', height: '40px', marginRight: '20px' }}>
                                    <button style={{ fontWeight: '400', fontSize: '20px', borderRadius: '25px' }}
                                    >Revisar Detalle</button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}

import React, { useEffect, useState } from 'react'
import { useFetchObtenerDireccionUsuario } from '../hooks/useFetchObtenerDireccionUsuario'
import { useFetchActualizarDireccionUsuario } from '../hooks/useFetchActualizarDireccionUsuario'
import { useFetchObtenerTarjetas } from '../hooks/useFetchObtenerTarjetas'

export const MediosPago = ({ enviarIndexBoton }) => {

    const [id, setId] = useState('1')

    const [tarjeta, setTarjeta] = useState(``)

    const handleTarjetaChange = (event) => {
        let valorIngresado = event.target.value;

        let soloNumeros = valorIngresado.replace(/\D/g, '');
        setTarjeta(soloNumeros);
    }

    const [mesvenc, setMesvenc] = useState(``)

    const handleMesVencChange = (event) => {
        setMesvenc(event.target.value);
    }

    const [anovenc, setAnovenc] = useState(``)

    const handleAnoVencChange = (event) => {
        setAnovenc(event.target.value);
    }

    const [cvv, setCvv] = useState(``)

    const handleCvvChange = (event) => {
        setCvv(event.target.value);
    }

    const nombreusuario = localStorage.getItem('usuario')

    const [mediospago, setMediospago] = useState([])

    const obtenerDirecciones = async () => {
        const mediosPagoArray = await useFetchObtenerTarjetas(nombreusuario);
        //console.log("aca esta", direccionesArray);
        setMediospago(mediosPagoArray);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await useFetchActualizarDireccionUsuario(id, direccion);

        alert("Datos Actualizados");

        setdireccion('')
    }

    useEffect(() => {
        obtenerDirecciones();
        enviarIndexBoton(4);
    }, []);
    return (
        <>
            <div className='micuenta-content-page-direcciones'>
                <h1 style={{ fontWeight: '500' }}>Medios de Pago</h1>
                <div className='tarjetas-content'>
                    {
                        mediospago.map((medios) => (
                            <div className='direccion-div'
                                key={medios.idtarjeta}
                            >
                                <h3 style={{ marginLeft: '20px', fontWeight: '400' }}>{"xxxx-xxxx-xxxx-" + medios.numerotarjeta.toString().substring(12, 16)}</h3>
                                <div style={{ width: '80px', height: '30px', marginRight: '20px' }}>
                                    <button style={{ fontWeight: '400', fontSize: '15px', borderRadius: '25px' }}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    }
                    <h2>Agregar Tarjeta</h2>
                    <div className='agregar-tarjeta'>
                        <input style={{ width: '300px' }} type="text" value={tarjeta} onChange={handleTarjetaChange}
                            placeholder='Numero de Tarjeta' />
                        <input style={{ width: '170px' }} type="text" value={mesvenc} onChange={handleMesVencChange}
                            placeholder='Mes de Vencimiento' />
                        <input style={{ width: '170px' }} type="text" value={anovenc} onChange={handleAnoVencChange}
                            placeholder='Año de Vencimiento' />
                        <input style={{ width: '80px' }} type="text" value={cvv} onChange={handleCvvChange}
                            placeholder='CVV' />
                    </div>
                    <button style={{ height: '100px', fontSize: '19px' }} onClick={handleSubmit} className='boton-registrarse'>Agregar Tarjeta</button>
                </div>
            </div>
        </>
    )
}

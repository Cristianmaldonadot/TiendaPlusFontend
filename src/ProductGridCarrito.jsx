import React, { useEffect, useState } from 'react'
import { useFetchProducts } from './hooks/useFetchProducts';
import { ItemsCarrito } from './ItemsCarrito';
import { useFetchLocalStorage } from './hooks/useFetchLocalStorage';
import { ResumenOrden } from './ResumenOrden';
import deleteIcon from './assets/delete.svg'

export const ProductGridCarrito = ({ idusuario, actualizarCounters }) => {

    const [eliminacion, setEliminacion] = useState(false)

    const cambiarValorEliminacion = (valor) => {
        setEliminacion(valor);
    }

    const [productoEliminado, setProductoEliminado] = useState('')

    const recibirProductoEliminado = (dato) => {
        setProductoEliminado(dato);
    }

    const { nuevoCarrito, sumaTotales, totalCantidades } = useFetchLocalStorage()
    const [totalpagar, settotalpagar] = useState(sumaTotales)
    const [countResumen, setCountResumen] = useState(totalCantidades)

    const handreClicks = () => {
        actualizarCounters();
        const { sumaTotales, totalCantidades } = useFetchLocalStorage()
        setCountResumen(totalCantidades);
        settotalpagar(sumaTotales);
    };
    
    useEffect(() => {
        //recibirBoleano();
      }, []);

    return (
        <>

            <div className="card-grid">
                <div className='products-car'>
                    {
                        nuevoCarrito.map((producto) => (
                           
                            <ItemsCarrito
                                key={producto.idproducto}
                                {...producto}
                                actualizarCounter={handreClicks}
                                cambiarValorEliminacion={(value) => cambiarValorEliminacion(value)}
                                enviarProductoEliminado={recibirProductoEliminado}
                            />
                                        
                        ))
                    }

                </div>

                <ResumenOrden totalpagar={totalpagar} count={countResumen}></ResumenOrden>
                {
                    eliminacion && (
                        <div className='cuadro-elimnacion'>
                            <div><img style={{ width: '25px' }} src={deleteIcon} /></div>
                            <div className='cuadro-elimnacion-span'>
                                <h5>Producto Eliminado :</h5>
                                <span>{productoEliminado}</span>
                            </div>

                        </div>
                    )
                }


            </div>
        </>
    )
}

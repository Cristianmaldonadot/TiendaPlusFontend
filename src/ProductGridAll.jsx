import React, { useEffect, useState } from 'react'
import { ModalLogin } from './ModalLogin';
import { ModalMostrarAgregarProductos } from './ModalMostrarAgregarProductos';
import { Paginacion } from './Paginacion';
import { Link } from 'react-router-dom';
import { DetallesProducto } from './DetalleProducto';
import { useFetchProductsAll } from './hooks/useFetchProductosAll';
import { ItemsAll } from './ItemsAll';

export const ProductGridAll = ({ actualizarCounters, filtroPalabra, setearPalabra }) => {

    const [mostrarAgregarProductos, setMostrarAgregarProductos] = useState(false)

    const { products, isLoading, nombreusu } = useFetchProductsAll();
    const [palabraBuscada, setPalabraBuscada] = useState(filtroPalabra)

    useEffect(() => {
        // Actualizar palabraBuscada cuando filtroPalabra cambia
        setPalabraBuscada(filtroPalabra);
    }, [filtroPalabra]);


    const filtroProducts = products.filter(prod => prod.nombre.toLowerCase().includes(palabraBuscada.toLowerCase())
        || prod.categoria.toLowerCase().includes(palabraBuscada.toLowerCase()));

    const [dataQt, setDataQt] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)

    const indexFin = currentPage * dataQt;
    const indexInit = indexFin - dataQt;

    const nProducts = filtroProducts.slice(indexInit, indexFin);
    const nPages = Math.ceil(filtroProducts.length / dataQt);

    const handleClick = () => {
        setMostrarAgregarProductos(!mostrarAgregarProductos); // Cambiar el estado al hacer clic   
    };

    const handreClicks = () => {
        actualizarCounters();
    };


    return (
        <>
            <div className='container-flex'>
                <div className='cargar-productos'>
                    
                    <h2> Productos de :  {nombreusu} </h2>
                    <Paginacion
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        nPages={nPages}
                    ></Paginacion>
                </div>
                {
                    isLoading && (<h2>Cargando....</h2>)
                }

                <div className="card-grid">
                    {
                        nProducts.map((producto) => (
                            <ItemsAll
                                key={producto.key}
                                {...producto}
                                actualizarCounter={handreClicks}
                            >
                            </ItemsAll>
                        ))
                    }
                    {
                        mostrarAgregarProductos && (<ModalMostrarAgregarProductos cerrarventana={handleClick} ></ModalMostrarAgregarProductos>)
                    }

                </div>
            </div>
        </>
    )
}

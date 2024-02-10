import React, { useEffect, useState } from 'react'
import { Items } from './Items'
import { useFetchProducts } from './hooks/useFetchProducts';
import { ModalLogin } from './ModalLogin';
import { ModalMostrarAgregarProductos } from './ModalMostrarAgregarProductos';
import { Paginacion } from './Paginacion';
import { Link } from 'react-router-dom';
import { DetallesProducto } from './DetalleProducto';
import { useFetchProductsAll } from './hooks/useFetchProductosAll';
import { useVerifyUserAdmin } from './hooks/useVerifyUserAdmin';

export const ProductGrid = ({ idusuario, actualizarCounters, filtroPalabra, setearPalabra }) => {

    console.log("estoy en el productGrid y el idusuario es", idusuario)

    const [mostrarAgregarProductos, setMostrarAgregarProductos] = useState(false)

    const verificarIdUsuarioForList = () => {
        let data

        if (idusuario !== null) {
            data = useFetchProducts(idusuario);
        } else {
            data = useFetchProductsAll();
        }
        console.log("esta es la data de la consulta", data)
        return data;
    }

    const { products, isLoading, nombreusu } = verificarIdUsuarioForList();
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

    const verifyUserAdmin = useVerifyUserAdmin();

    return (
        <>
            <div className='container-flex'>
                <div className='cargar-productos'>
                    {
                        verifyUserAdmin && (<button className='cargar-productos-boton' onClick={handleClick} >Agregar Producto</button>)
                    }

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
                            <Items
                                key={producto.key}
                                {...producto}
                                actualizarCounter={handreClicks}
                            >
                            </Items>
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

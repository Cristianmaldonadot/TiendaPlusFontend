import React, { useEffect, useState } from 'react'
import { Items } from './Items'
import { useFetchProducts } from './hooks/useFetchProducts';
import { useVerifyUser } from './hooks/useVerifyUser';
import { ModalLogin } from './ModalLogin';
import { ModalMostrarAgregarProductos } from './ModalMostrarAgregarProductos';
import { Paginacion } from './Paginacion';

export const ProductGrid = ({ idusuario, actualizarCounters, filtroPalabra, setearPalabra }) => {

    const [mostrarAgregarProductos, setMostrarAgregarProductos] = useState(false)

    const { products, isLoading, nombreusu } = useFetchProducts(idusuario);
    const [palabraBuscada, setPalabraBuscada] = useState(filtroPalabra)

    useEffect(() => {
        // Actualizar palabraBuscada cuando filtroPalabra cambia
        setPalabraBuscada(filtroPalabra);
    }, [filtroPalabra]);

    
    console.log("estoy en el Grid", palabraBuscada)

    const filtroProducts = products.filter(prod => prod.nombre.toLowerCase().includes(palabraBuscada.toLowerCase()));

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
        console.log("estoy aqui en el ProdGrid")
    };

    const verifyUser = useVerifyUser();

    return (
        <>
            <div className='cargar-productos'>
                {
                    verifyUser && (<button onClick={handleClick} >Cargar Productos</button>)
                }

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
                        <Items
                            key={producto.key}
                            {...producto}
                            actualizarCounter={handreClicks}
                        />

                    ))
                }
                {
                    mostrarAgregarProductos && (<ModalMostrarAgregarProductos cerrarventana={handleClick} ></ModalMostrarAgregarProductos>)
                }

            </div>
        </>
    )
}

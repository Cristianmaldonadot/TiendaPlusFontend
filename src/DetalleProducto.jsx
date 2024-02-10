import { useParams } from 'react-router-dom';
import { useFetchObtenerProducto } from './hooks/useFetchObtenerProducto';
import { useEffect, useRef, useState } from 'react';
import alertIcon from './assets/alert.svg';
import './detalleProducto.css';

export const DetallesProducto = ({ actualizarCounter }) => {

    const [maximoCompra, setMaximoCompra] = useState(false)

    const [counter, setcounter] = useState(1)

    const productoRef = useRef(null);

    const handleCantidad = (operacion) => {
        if (operacion === 'restar') {
            setcounter(counter - 1)
        } else if (operacion === 'sumar') {
            setcounter(counter + 1)
        }
    }

    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    const obtenerProducto = async () => {
        const getProducto = await useFetchObtenerProducto(id)
        setProducto(getProducto)
        productoRef.current = getProducto;
        console.log("Este es el producto", getProducto)
    }
    const handleClick = () => {
        const cantidad = counter;
        const total = productoRef.current.precio * cantidad;
        const isChecked = true;

        const producto = {
            idproducto: productoRef.current.idproducto,
            marca: productoRef.current.marca,
            nombre: productoRef.current.nombre,
            descripcion: productoRef.current.descripcion,
            stock: productoRef.current.stock,
            imagen: productoRef.current.imagen,
            precio: productoRef.current.precio,
            nombreusu: productoRef.current.usuario.username,
            cantidad,
            total,
            isChecked
        };


        const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
        console.log("estoy en items", carritoActual);

        const productoExistente = carritoActual.find(item => item.idproducto === producto.idproducto);

        if (productoExistente) {
            const maximositems = productoExistente.cantidad + counter;
            // Si el producto ya está en el carrito, incrementa la cantidad
            if (productoExistente.cantidad >= maximo || maximositems >= maximo + 1) {
                setMaximoCompra(true)
            } else {
                productoExistente.cantidad += counter;
                productoExistente.total = productoExistente.cantidad * productoExistente.precio;
            }

        } else {
            // Si el producto no está en el carrito, agrégalo
            carritoActual.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carritoActual));

        actualizarCounter();

    }

    useEffect(() => {
        obtenerProducto();
    }, []);


    if (!producto) {
        // Manejar el caso donde no hay detalles del producto
        return <p>No se encontraron detalles del producto.</p>;
    }
    const maximo = Math.round(producto.stock / 15);

    return (
        <>
            <div className='detalle-container'>
                <div className='detalle-imagen'>
                    <img style={{width:'480px'}} src={producto.imagen} alt="" />
                </div>
                <div className='detalle-descripcion'>
                    <div className='detalle-marca'>
                        <h3 className='h3'>{producto.marca}</h3>
                        <span>Id Producto: {producto.idproducto}</span>
                    </div>
                    <div className='detalle-nombre'>
                        <h1 className='h1'>{producto.nombre}</h1>
                    </div>
                    <h4>{producto.descripcion}</h4>

                    <h2 className='h2'>S/. {producto.precio}</h2>
                    <span>Vendido por: {producto.usuario.username}</span>

                    <div className='detalle-agregar'>
                        <div className='carrito-cantidad'>

                            <button onClick={() => handleCantidad('restar')} className='boton-mas-menos' disabled={counter === 1} >-</button>
                            <h4>{counter}</h4>
                            <button onClick={() => handleCantidad('sumar')} className='boton-mas-menos' disabled={counter === maximo}>+</button>
                            <span className='h4'>Maximo : {maximo}</span>
                            {
                                counter === maximo ? <div className='cantidad-maxima'>
                                    <span className='detalle-span'>Solo puede llevar {maximo} unidades</span></div> : ''
                            }

                        </div>

                        <button onClick={handleClick} className='boton'>Agregar al Carro</button>
                        {
                            maximoCompra && (<div className='cantidad-maxima-producto'><img src={alertIcon} alt="" />
                                <span className='detalle-span-producto' >Has alcanzado la cantidad maxima para ese producto</span></div>)
                        }
                    </div>
                </div>

            </div>

        </>

    );
};
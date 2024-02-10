import React, { useEffect, useState } from 'react'
import { DetallesProducto } from './DetalleProducto';
import { Link } from 'react-router-dom';
import editarProduct from './assets/edit.svg'
import { useVerifyUserAdmin } from './hooks/useVerifyUserAdmin';

export const Items = ({ idproducto, marca, nombre, descripcion, stock, imagen, precio, nombreusu, actualizarCounter }) => {

    const [maximoCompra, setMaximoCompra] = useState(false)

    function obtenerParametro(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    const valorVariable = obtenerParametro('id');

    const [windowWith, setwindowWith] = useState(window.innerWidth)

    console.log("este es el ancho",windowWith)

    const handleClick = () => {
        const cantidad = 1;
        const total = precio * cantidad;
        const isChecked = true;

        const producto = {
            idproducto,
            marca,
            nombre,
            descripcion,
            stock,
            imagen,
            precio,
            nombreusu,
            cantidad,
            total,
            isChecked
        };


        const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
        console.log("estoy en items", carritoActual);

        const productoExistente = carritoActual.find(item => item.idproducto === producto.idproducto);

        if (productoExistente) {
            if (productoExistente.cantidad >= maximo) {
                setMaximoCompra(true)
            } else {
                productoExistente.cantidad += 1;
                productoExistente.total = productoExistente.cantidad * productoExistente.precio;
            }
        } else {
            // Si el producto no está en el carrito, agrégalo
            carritoActual.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carritoActual));

        actualizarCounter();
    }

    const maximo = Math.round(stock / 15);

    const verificarRol = useVerifyUserAdmin();

    useEffect(() => {
        const handleResize = () => {
            setwindowWith(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Limpia el event listener en la desmontada del componente
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (

        <div className='items'>
            <Link className='link' to={`/productos/${idproducto}`}>
                <img className='img-product' src={imagen} alt={nombre} />
                <hr />
                <div className='resumen-carrito'>
                    <span style={{ fontWeight: '600' }}>{marca.toUpperCase()}</span>
                    <div className='caja-nombre'>
                        <span className='caja-nombre-span'>{nombre}</span>
                    </div>
                    <span>Vendido por : {nombreusu.toUpperCase()}</span>
                    <h2>S/. {precio.toLocaleString('en-US')}</h2>

                    <div className='stock-id'>
                        <h5>Stock : {stock}</h5>
                        <h5>Id Producto: {idproducto}</h5>

                    </div>
                </div>
            </Link>
            <div className='div-boton-item'>
                <button onClick={handleClick} className='boton-carrito'>{windowWith > 450 ? (`Agregar al Carro`) : (`Agregar`) }</button>
                {
                    maximoCompra && (<div className='cantidad-maxima-producto-lista'>
                        <span className='detalle-span-producto-carrito' >Max: {maximo}</span></div>)
                }
                {
                    verificarRol && (<Link className='link' to={`/editar_productos/${idproducto}`}>
                        <img className='logo-edit' src={editarProduct} alt="" />
                    </Link>
                    )
                }


            </div>

        </div>
    )
}

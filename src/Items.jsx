import React from 'react'

export const Items = ({idproducto, marca, nombre, descripcion, stock, imagen, precio, nombreusu, actualizarCounter }) => {

    const handleClick = () =>{
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
        // Si el producto ya está en el carrito, incrementa la cantidad
            productoExistente.cantidad += 1;
            productoExistente.total = productoExistente.cantidad * productoExistente.precio;
        } else {
        // Si el producto no está en el carrito, agrégalo
        carritoActual.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carritoActual));
      
        actualizarCounter();
    }
    
  return (
    <div className='items'>
        <img src={imagen} alt={nombre} />
        <hr />
        <div className='resumen-carrito'>
            <span style={{fontWeight:'600'}}>{marca.toUpperCase()}</span>
            <div className='caja-nombre'>
                <span className='caja-nombre-span'>{nombre}</span>
            </div>
            <span>Vendido por : {nombreusu.toUpperCase()}</span>
            <h2>S/. {precio.toLocaleString('en-US')}</h2>
            
            <div className='stock-id'>
                <h5>Stock : {stock}</h5>
                <h5>Id Producto: {idproducto}</h5>
            </div> 
            
            <button onClick={handleClick} className='boton-carrito'>Agregar al Carro</button>    
            
        </div>
    </div>
  )
}

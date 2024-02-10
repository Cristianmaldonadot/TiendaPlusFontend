import React, { useEffect, useState } from 'react'
import deleteIcon from './assets/delete.svg'
import alertIcon from './assets/alert.svg';

export const ItemsCarrito = ({ idproducto, marca, nombre, descripcion, stock, imagen, precio, nombreusu,
  cantidad, total, isChecked, actualizarCounter, cambiarValorEliminacion, enviarProductoEliminado }) => {

  const [isCheckeds, setIsCheckeds] = useState(isChecked);

  const handleCantidad = (operacion) => {
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
      isChecked,
    };
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carritoActual.find(item => item.idproducto === producto.idproducto);

    if (operacion === 'restar') {
      if (productoExistente && productoExistente.cantidad > 1) {
        productoExistente.cantidad -= 1;
        productoExistente.total = productoExistente.cantidad * productoExistente.precio;
      }
    } else if (operacion === 'sumar') {
      if (productoExistente) {
        if (productoExistente.cantidad >= maximo) {
          setMaximoCompra(true)
        } else {
          productoExistente.cantidad += 1;
          productoExistente.total = productoExistente.cantidad * productoExistente.precio;
        }
      } else {
        //carritoActual.push({ ...producto, cantidad: 1 });
      }
    } else if (operacion === 'delete') {
      const indiceAEliminar = carritoActual.findIndex(item => item.idproducto === producto.idproducto);
      carritoActual.splice(indiceAEliminar, 1)
      cambiarValorEliminacion(true);
      const productoEliminado = productoExistente.nombre;
      enviarProductoEliminado(productoEliminado);

      setTimeout(() => {
        cambiarValorEliminacion(false); // Cambiar el estado eliminacion a false
      }, 5000);
      //alert(`Eliminaste : ${productoExistente.nombre}`);

    }
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
    actualizarCounter();
    console.log(carritoActual);
    //enviarBoleano(isChecked);
  }
  const handleCheckboxChange = () => {
    setIsCheckeds(!isCheckeds);
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
      isChecked,
    };

    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carritoActual.find(item => item.idproducto === producto.idproducto);

    if (productoExistente) {
      productoExistente.isChecked = !isChecked;
    }
    console.log(productoExistente.isChecked);
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
    actualizarCounter();
  };
  useEffect(() => {
    //handleCantidad();
  }, []);

  const maximo = Math.round(stock / 15);

  return (
    <div className='items-carrito'>
      <label className='items-carrito-div'>
        <input
          className='input-valid-car'
          type="checkbox"
          checked={isCheckeds}
          onChange={handleCheckboxChange} />
      </label>
      <div className='items-carrito-div2'>
        <div>
          <img src={imagen} alt={nombre} />
        </div>
        <div className='items-carrito-titulo'>
          <div className='items-carrito-titulo-sub'>
            <span style={{ fontWeight: '600' }}>{marca.toUpperCase()}</span>
            <div className='caja-nombre-carrito'>
              <span className='caja-nombre-span'>{nombre}</span>
            </div>
            <span>Vendido por : {nombreusu.toUpperCase()}</span>
          </div>
        </div>
        <div className='items-carrito-precio'>
          <h2>S/. {precio.toLocaleString('en-US')}</h2>
        </div>
        <div className='carrito-cantidad-div'>
          <div className='carrito-botones'>
            <button onClick={cantidad === 1 ? () => handleCantidad('delete') : () => handleCantidad('restar')} className='boton-mas-menos' >
              {
                cantidad === 1 ? <img style={{ width: '20px' }} src={deleteIcon} /> : "-"
              }
            </button>
            <h4>{cantidad}</h4>
            <button onClick={() => handleCantidad('sumar')} className='boton-mas-menos'>+</button>
          </div>
          {
            cantidad === maximo ? (<div className='cantidad-maxima-producto-carrito'>
              <span className='detalle-span-producto-carrito' >Maximo {maximo} unidades</span></div>) : ''
          }
        </div>
      </div>
    </div>
  )
}
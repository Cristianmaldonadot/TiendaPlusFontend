import React from 'react'

export const useFetchLocalStorage = () => {

    const nuevoCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoFiltrado = nuevoCarrito.filter(item => item.isChecked === true);

    const sumaTotales = carritoFiltrado.reduce((total, item) => total + item.total, 0);
    const totalCantidades = carritoFiltrado.reduce((total, producto) => total + producto.cantidad, 0);
    console.log("estos son los valores", carritoFiltrado);


    return {nuevoCarrito, sumaTotales, totalCantidades };
}

import React from 'react'

export const useFetchLocalStorage = () => {

    const nuevoCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const sumaTotales = nuevoCarrito.reduce((total, item) => total + item.total, 0);
    const totalCantidades = nuevoCarrito.reduce((total, producto) => total + producto.cantidad, 0);


    return {nuevoCarrito, sumaTotales, totalCantidades };
}

import React, { useEffect, useState } from 'react'
import './styles.css';
import { AddCategory } from './AddCategory';
import { ProductGrid } from './ProductGrid';
import { Carrito } from './Carrito';
import { IniciarSesion } from './IniciarSesion';
import { Titulo } from './Titulo';
import { Menu } from './Menu';
import { FooterItem } from './FooterItem';
import { CerrarSesion } from './CerrarSesion';

export const TiendaPlus = () => {
    
    function obtenerParametro(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
      }
    
    const valorVariable = obtenerParametro('id');
    
    const [idusuario, setIdusuario] = useState([valorVariable])

    const [contador, setContador] = useState(0)

    const [sesioniniciada, setSesioniniciada] = useState(false)

    const [filtroProducto, setFiltroProducto] = useState('')

    const buscarProducto = (nuevoProduct) =>{
      console.log("Nuevo producto:", nuevoProduct);
      setFiltroProducto(nuevoProduct);
    }
    

    const verificarSession = () =>{
        if(localStorage.getItem('usuario')){
            setSesioniniciada(true);
          }
    }

    const sumarContador = () =>{
        const nuevoCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalCantidades = nuevoCarrito.reduce((total, producto) => total + producto.cantidad, 0);
        setContador(totalCantidades);
        console.log("Sumar Contador",nuevoCarrito);
    }

    useEffect(() => {
        // Actualizar el contador al cargar la página
        sumarContador();
        verificarSession();
      }, []);


  return (
    <>
        <div className='container'>
            <header>
                <Titulo></Titulo>
                <Menu></Menu>
                <AddCategory onFilterProducts={(valor)=>buscarProducto(valor)}></AddCategory>
                <IniciarSesion></IniciarSesion>
                {
                  sesioniniciada && (<CerrarSesion></CerrarSesion>)
                }
                
                <Carrito contador={contador}></Carrito>
            </header>
            <div className='contenido'>
            {
                idusuario.map( (id) => (
                    <ProductGrid 
                        key={id}
                        idusuario={id}
                        actualizarCounters={sumarContador}
                        filtroPalabra={filtroProducto}
                        setearPalabra={buscarProducto}
                /> 
            ))
            }
            </div>
            <FooterItem></FooterItem>
        </div>
    </>
  )
}

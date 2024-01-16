import React, { useEffect, useState } from 'react'
import './styles.css';
import { AddCategory } from './AddCategory';
import { Carrito } from './Carrito';
import { ProductGridCarrito } from './ProductGridCarrito';
import { IniciarSesion } from './IniciarSesion';
import { Titulo } from './Titulo';
import { Menu } from './Menu';
import { FooterItem } from './FooterItem';
import { CerrarSesion } from './CerrarSesion';

export const TiendaPlusCarrito = () => {
    
    const [idusuario, setIdusuario] = useState(['1'])

    const [contador, setContador] = useState(0)

    const [sesioniniciada, setSesioniniciada] = useState(false)

    const verificarSession = () =>{
        if(localStorage.getItem('usuario')){
            setSesioniniciada(true);
          }
    }

    const sumarContador = () =>{
        const nuevoCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalCantidades = nuevoCarrito.reduce((total, producto) => total + producto.cantidad, 0);
        setContador(totalCantidades);
        //console.log(nuevoCarrito);
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
                <AddCategory></AddCategory>
                <IniciarSesion></IniciarSesion>
                {
                  sesioniniciada && (<CerrarSesion></CerrarSesion>)
                }
                
                <Carrito contador={contador}></Carrito>
            </header>
            <div className='contenido'>
            {
                idusuario.map( (id) => (
                    <ProductGridCarrito 
                        key={id}
                        idusuario={id}
                        actualizarCounters={sumarContador}
                /> 
            ))
            }
            </div>
            <FooterItem></FooterItem>
        </div>
    </>
  )
}

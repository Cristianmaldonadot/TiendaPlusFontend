import React from 'react'
import { Botonmenu } from './Botonmenu'

export const MenuBar = () => {
  return (
    <>
        <div className='menu'>
            <Botonmenu item={"Listar Productos"} ></Botonmenu>
            <Botonmenu item={"Mostrar Productos"} ></Botonmenu>
            <Botonmenu item={"Agregar Productos"} ></Botonmenu>
            
        </div>
    
    </>
  )
}

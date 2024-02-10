import React from 'react'

export const ResumenOrden = ({totalpagar, count}) => {
  return (
    <>
        <div className='venta-total'>
            <h2>Resumen de la Orden</h2>
            <div className='venta-total-div'>
                <h4>Productos ({count}) :</h4><h4>S/. {totalpagar.toLocaleString('en-US')}</h4> 
            </div>
            <div className='venta-total-div'>
                <h4>Total:</h4><h4>S/. {totalpagar.toLocaleString('en-US')}</h4> 
            </div>
            
           
            <div>
                <button className='boton-resumen'>Continuar Compra</button>
            </div>
           
        </div>
        
    
    </>
  )
}

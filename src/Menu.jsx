import React from 'react'
import arrow from './assets/arrow-down.svg'

export const Menu = () => {
  return (
    <>
        <div className='menu-side'>
            <button className='boton'>
                <div>Menu</div>
                <img src={arrow} alt="" />
             <div></div>
            </button>
        </div>
    
    </>
  )
}

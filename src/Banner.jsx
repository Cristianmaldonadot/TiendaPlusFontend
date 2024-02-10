import React from 'react'
import banner from './assets/Banner.svg'
import bannerImage from './assets/imagenes_banner.png'

export const Banner = () => {
    return (
        <>
            <div className='banner-div'>
                <img src={banner} alt="" />
                <div className='banner-img'>
                    <img style={{ position: 'absolute', left: '10vw', top: '1vw', width:'30vw' }} src={bannerImage} alt="" />
                </div>

            </div>

        </>

    )
}

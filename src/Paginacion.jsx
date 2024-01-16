import React from 'react'
import arrowLeft from './assets/arrow-left.svg'
import arrowRigth from './assets/arrow-rigth.svg'

export const Paginacion = ({ currentPage, setCurrentPage, nPages }) => {

    const handleElegirPage = (valor)=>{
        setCurrentPage(valor);
    }

    const handleBack = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }

    var numerosArray = [];

    for (var i = 0; i < nPages; i++) {
        numerosArray.push({ key: i + 1, valor: i + 1 });
    }


    return (
        <>
            <div className='paginacion'>
                <button onClick={handleBack}><img src={arrowLeft} alt="" /></button>
                <div className='paginacion-page'>
                    {
                        numerosArray.map((paginas) => (
                            <button onClick={() => handleElegirPage(paginas.valor)}
                            style={{
                                backgroundColor: currentPage === paginas.valor ? 'darkslateblue' : undefined,
                                color: currentPage === paginas.valor ? 'white' : undefined,
                                // Otros estilos que desees aplicar
                            }}
                            key={paginas.key}>{paginas.valor}</button>
                        ))
                    }

                </div>
                <button onClick={handleNext}><img src={arrowRigth} alt="" /></button>
            </div>
        </>

    )
}

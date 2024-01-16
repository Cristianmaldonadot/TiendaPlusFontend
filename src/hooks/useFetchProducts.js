import { useEffect, useState } from 'react'
import { GetProducts } from '../helpers/GetProducts';

export const useFetchProducts = (idusuario) => {

    const [products, setProducts] = useState([]);  
    const [isLoading, setIsLoading] = useState(true);
    const [nombreusu, setNombreusu] = useState(true);
    
    const getImages = async ()=>{
        const newProducts = await GetProducts(idusuario);
        setProducts(newProducts);
        setIsLoading(false);
        const nombreusuario = newProducts[0].nombreusu.toUpperCase();
        setNombreusu(nombreusuario);
        console.log(newProducts);
    }

    useEffect(()=>{
        getImages();
    }, [])

    return {
        products,
        isLoading,
        nombreusu
    }
}

import { useEffect, useState } from 'react'
import { GetProductsAll } from '../helpers/GetProductsAll';

export const useFetchProductsAll = () => {

    const [products, setProducts] = useState([]);  
    const [isLoading, setIsLoading] = useState(true);
    const [nombreusu, setNombreusu] = useState(null);
    
    const getImages = async ()=>{
        const newProducts = await GetProductsAll();
        setProducts(newProducts);
        setIsLoading(false);
        const nombreusuario = "Todos";
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
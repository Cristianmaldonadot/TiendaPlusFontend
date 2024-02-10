import { useObtenerIdUsuario } from './useObtenerIdUsuario';

export const useObtenerIdUsuarioPorUrl = async (nombreusuario) => {

    const idUsuario = async()=>{
        if(nombreusuario !== null){
            return await useObtenerIdUsuario(nombreusuario);
        }
        return null
    } 

    function obtenerParametro(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    let valorVariable = obtenerParametro('id');

    if(valorVariable === null){
        valorVariable = await idUsuario();
        console.log("estoy en el if")
    }

    localStorage.setItem('idurl', JSON.stringify(valorVariable));
    console.log("Este el el valorvariable", valorVariable)

    return valorVariable;  
}

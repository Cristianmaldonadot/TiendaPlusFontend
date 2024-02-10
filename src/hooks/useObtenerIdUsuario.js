export const useObtenerIdUsuario = async (nombreusuario) => {
    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    const token = localStorage.getItem('token');

    const url = `${variableEnt}/usuariopornombre/${nombreusuario}`
    const resp = await fetch(url, { 
        method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
    const data = await resp.json();
    const idusuario = data.idusuario;
    console.log("Info de usuario", data)
    
    
    /*if (idusuario) {
        //localStorage.setItem('idusuario', idusuario);
        console.log('idusuario guardado exitosamente:', idusuario);
    } else {
        console.log('No se pudo obtener el idusuario');
    }*/

    return idusuario;
}

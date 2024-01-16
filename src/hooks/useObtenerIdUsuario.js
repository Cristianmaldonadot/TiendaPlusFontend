export const useObtenerIdUsuario = async (nombreusuario) => {

    const token = localStorage.getItem('token');

    const url = `http://localhost:8075/usuariopornombre/${nombreusuario}`
    const resp = await fetch(url, { 
        method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
    const data = await resp.json();
    const idusuario = data.idusuario;
    
    
    /*if (idusuario) {
        //localStorage.setItem('idusuario', idusuario);
        console.log('idusuario guardado exitosamente:', idusuario);
    } else {
        console.log('No se pudo obtener el idusuario');
    }*/

    return idusuario;
}

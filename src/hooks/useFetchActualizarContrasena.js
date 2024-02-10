export const useFetchActualizarContrasena = async (id, passwordOld, passwordNew) => {

    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    console.log(id,passwordOld, passwordNew)

    const token = localStorage.getItem('token');

    const url = `${variableEnt}/${id}/cambiarcontrasena/${passwordOld}/${passwordNew}`
    const resp = await fetch(url, {
        method: 'POST', headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const data = await resp.text();

    return data;
}
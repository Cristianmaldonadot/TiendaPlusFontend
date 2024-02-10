export const useFetchObtenerUsuarioAll = async (nombreusuario) => {
    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    const token = localStorage.getItem('token');

    const url = `${variableEnt}/usuariopornombre/${nombreusuario}`
    const resp = await fetch(url, { 
        method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
    const data = await resp.json();

    return data;
}
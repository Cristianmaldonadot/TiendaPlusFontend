export const useFetchEliminarDireccion = async (id , idDireccion) => {
    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    console.log(id,idDireccion)

    const token = localStorage.getItem('token');

    const url = `${variableEnt}/${id}/eliminardireccion/${idDireccion}`
    const resp = await fetch(url, {
        method: 'DELETE', headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const data = await resp.text();

    return data;
}
export const useFetchActualizarDireccionUsuario = async (id , direccion) => {
    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    const token = localStorage.getItem('token');

    const nuevaDireccion = [direccion];

    const url = `${variableEnt}/agregardireccionusuario/${id}`
    const resp = await fetch(url, {
        method: 'POST', headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(nuevaDireccion),
    });
    const data = await resp.json();

    return data;
}
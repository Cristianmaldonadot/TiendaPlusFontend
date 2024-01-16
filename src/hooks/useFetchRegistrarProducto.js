export const useFetchRegistrarProducto = async (nombre, descripcion, stock, precio, usuario, archivo) => {

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('stock', stock); // Ejemplo de valor para el stock
    formData.append('precio', precio); // Ejemplo de valor para el precio
    formData.append('usuario', usuario); // Reemplaza 'ID del Usuario' con el ID real del usuario
    formData.append('file', archivo);


    const url = `http://localhost:8075/registrarproducto`
    const resp = await fetch(url, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    const data = await resp.text();
    console.log(data);
    
    return data
}
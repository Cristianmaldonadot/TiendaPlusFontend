export const useFetchActualizarProducto = async (idproducto, marca, nombre, descripcion, stock, categoria, precio, idusuario, selectedImage, oldnamefile) => {
    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('idproducto', idproducto);
    formData.append('marca', marca);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('stock', stock); // Ejemplo de valor para el stock
    formData.append('categoria', categoria);
    formData.append('precio', precio); // Ejemplo de valor para el precio
    formData.append('usuario', idusuario); // Reemplaza 'ID del Usuario' con el ID real del usuario
    formData.append('file', selectedImage);
    formData.append('oldnamefile', oldnamefile);
    console.log("estos son los datos del producto actualizar", oldnamefile,selectedImage)


    const url = `${variableEnt}/registrarproducto`
    const resp = await fetch(url, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    const data = await resp.text();
    console.log(data);
    
    return data
}
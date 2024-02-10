export const useFetchActualizarDatosUsuario = async (id , nombre, apPaterno, apMaterno, docidentidad, celular, email) => {
    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    
    const token = localStorage.getItem('token');

    const usuario = {
        docidentidad: docidentidad,
        celular: celular,
        email: email,
        nombre: nombre,
        appaterno: apPaterno,
        apmaterno: apMaterno,
    };

    const url = `${variableEnt}/actualizarusuario/${id}`
    const resp = await fetch(url, {
        method: 'POST', headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(usuario),
    });
    const data = await resp.json();
    console.log(data);

    return data;
}
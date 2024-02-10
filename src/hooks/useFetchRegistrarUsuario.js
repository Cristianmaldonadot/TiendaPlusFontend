
export const useFetchRegistrarUsuario = async (username, docidentidad, celular, email, password, roles) => {
    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    const usuario = {
        email: email,
        docidentidad: docidentidad,
        celular: celular,
        username: username,
        password: password,
        roles: [roles]
    };


    const url = `http://localhost:8075/registrarusuario`
    const resp = await fetch(url, {
        method: 'POST', headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    });
    const data = await resp.json();
    console.log(data);

    return data;
}

export const useFetchLogin = async (username, password) => {
  const variableEnt = import.meta.env.VITE_BACKEND_URL

  const url = `${variableEnt}/login`
  const resp = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await resp.json();

  const token = data.token;
  const usuario = data.Username;
  const rol = data.Rol[0].authority;

  if (token) {
    console.log('Inicio de sesión exitoso. Token:', token);
    console.log('Inicio de sesión exitoso. Usuario:', usuario);
  } else {
    console.log('No se encontró un token en la respuesta de la autenticación.');
  }

  return { token, usuario, rol };

}

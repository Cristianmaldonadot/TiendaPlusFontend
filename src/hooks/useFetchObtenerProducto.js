export const useFetchObtenerProducto = async (idproducto) => {
  const variableEnt = import.meta.env.VITE_BACKEND_URL

  const url = `${variableEnt}/productos/${idproducto}`
  const resp = await fetch(url, {
    method: 'GET', headers: { 'Content-Type': 'application/json' },
  });
  const data = await resp.json();

  return data;
}

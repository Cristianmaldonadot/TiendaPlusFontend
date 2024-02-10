export const GetProducts = async (idusuario) => {
  const variableEnt = import.meta.env.VITE_BACKEND_URL

  const url = `${variableEnt}/listarproductosporid?idusuario=${idusuario}`
  const resp = await fetch(url);
  const data = await resp.json();

  const products = data.map(prod => ({
    key: prod.idproducto.toString(),
    idproducto: prod.idproducto,
    marca: prod.marca,
    nombre: prod.nombre,
    descripcion: prod.descripcion,
    stock: prod.stock,
    imagen: prod.imagen,
    precio: prod.precio,
    categoria: prod.categoria,
    nombreusu: prod.usuario.username
  }));

  return products;
}

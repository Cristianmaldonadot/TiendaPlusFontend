export const useFetchObtenerComprasUsuario = async (nombreusuario) => {

    // const token = localStorage.getItem('token');

    // const url = `http://localhost:8075/usuariopornombre/${nombreusuario}`
    // const resp = await fetch(url, { 
    //     method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    //     });
    // const data = await resp.json();
    // const direcciones = data.direcciones;
    const compras = [
        {
            idcompra: '052215254', fechaentrega: '20 de Diciembre 2023', producto: 'Teclado Ryzer',
            cant: 2, preciounit: 240.0, preciotot: 480.0, vendidopor: 'Tecnology Center'
        }, 
        {
            idcompra: '041521452', fechaentrega: '01 de Enero 2024', producto: 'Monitor Samsung G4',
            cant: 1, preciounit: 657.0, preciotot: 657.0, vendidopor: 'Mundo PC'
        }

    ]



    return compras;
}

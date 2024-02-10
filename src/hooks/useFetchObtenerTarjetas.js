export const useFetchObtenerTarjetas = async (nombreusuario) => {

    // const token = localStorage.getItem('token');

    // const url = `http://localhost:8075/usuariopornombre/${nombreusuario}`
    // const resp = await fetch(url, { 
    //     method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    //     });
    // const data = await resp.json();
    // const direcciones = data.direcciones;
    const compras = [
        {
            idtarjeta: '0452', numerotarjeta: '5367620001187047', mesvencimiento: '12',
            anovencimiento: '2026', cvv: 154
        }, 
        {
            idtarjeta: '0352', numerotarjeta: '5248744465126545', mesvencimiento: '10',
            anovencimiento: '2027', cvv: 845
        }

    ]



    return compras;
}
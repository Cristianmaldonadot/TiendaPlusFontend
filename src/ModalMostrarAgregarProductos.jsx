import React, { useState } from 'react'
import { useFetchRegistrarProducto } from './hooks/useFetchRegistrarProducto';
import { useObtenerIdUsuario } from './hooks/useObtenerIdUsuario';

export const ModalMostrarAgregarProductos = ({ cerrarventana }) => {

    const nombreusuario = localStorage.getItem('usuario')

    const obtenerIdUsuario = async () => {
        const idusuario = await useObtenerIdUsuario(nombreusuario);
        console.log("aca esta", idusuario);
        setUsuario(idusuario);
    }

    document.body.classList.add('no-scroll');

    const cerrarModal = () => {
        document.body.classList.remove('no-scroll');
        cerrarventana(false);
    }

    const [nombre, setNombre] = useState('');
    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    }

    const [descripcion, setDescripcion] = useState('');
    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    }

    const [stock, setStock] = useState('');
    const handleStockChange = (event) => {
        setStock(event.target.value);
    }

    const [precio, setPrecio] = useState('');
    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    }

    const [usuario, setUsuario] = useState('');

    const [archivo, setArchivo] = useState(null);

    const handleArchivoChange = (event) => {
        const archivoSeleccionado = event.target.files[0];
        setArchivo(archivoSeleccionado);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await useFetchRegistrarProducto(nombre, descripcion, stock, precio, usuario, archivo);

        alert(data);
        redirigirAIndex();

    }

    const url = localStorage.getItem("urlinicio");

    const redirigirAIndex = () => {
        window.location.href = url;
    };
    obtenerIdUsuario();

    const categorias = ['Computo', 'TVs', 'Videojuegos', 'Tecnología', 'Celular', 'Camping', 
    'Mujer', 'Hombre', 'Electrodomesticos', 'Zapatos', 'Decoración', 'Construccion'];  //Aca de agregan las categorias predefinidas

    return (

        <>
            <div className='modal-contenedor'>
                <div onClick={cerrarModal} className='fondo-modal-login'>
                </div>
                <div className='modal-agregar-productos'>
                    <div className='modal-container'>
                        <button onClick={cerrarModal} className='boton-cerrar' >X</button>
                        <h2>Agregar Producto</h2>
                        <form onSubmit={handleSubmit} className='form-agregar-productos'  >
                            <div className='agregar-productos'>
                                <label >Nombre</label>
                                <input className='modal-input-productos' type="text" value={nombre} onChange={handleNombreChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >Descripcion</label>
                                <input className='modal-input-productos' type="text" value={descripcion} onChange={handleDescripcionChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >Stock</label>
                                <input className='modal-input-productos' type="number" value={stock} onChange={handleStockChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >Precio</label>
                                <input className='modal-input-productos' type="number" value={precio} onChange={handlePrecioChange} />
                            </div>
                            <div className='agregar-productos'>
                                <label >Usuario</label>
                                <input className='modal-input-productos' type="text" value={usuario} readOnly />
                            </div>
                            <div className='agregar-productos'>
                                <label >Categoria</label>
                                <select className='modal-select-productos' name="" id="">
                                    {categorias.map((cat)=>(
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}                            
                                </select>
                            </div>
                            <div className='agregar-productos'>
                                <label >Imagen</label>
                                <input
                                    onChange={handleArchivoChange}
                                    className='input-file'
                                    type="file"
                                    style={{ border: '2px solid #ddd', padding: '10px', borderRadius: '5px' }}
                                />
                            </div>
                            <div className='agregar-productos'>

                            </div>
                            <button className='boton-agregarproducto'>Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>


    )
}


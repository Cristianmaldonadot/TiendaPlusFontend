import { useParams } from 'react-router-dom';
import { useFetchObtenerProducto } from './hooks/useFetchObtenerProducto';
import { useEffect, useRef, useState } from 'react';
import './detalleProducto.css';
import { useFetchActualizarProducto } from './hooks/useFetchActualizarProducto';

export const EditarProducto = () => {

    const productoRef = useRef(null);
    const marcaRef = useRef(null);
    const idproductoRef = useRef(null);
    const nombreRef = useRef(null);
    const descripcionRef = useRef(null);
    const precioRef = useRef(null);
    const stockRef = useRef(null);
    const categoriaRef = useRef(null);
    const imageRef = useRef(null);
    const idusuarioRef = useRef(null);
    const oldnamefileRef = useRef(null);


    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [marca, setMarca] = useState('')
    const [idproducto, setIdproducto] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [categoria, setCategoria] = useState('')
    const [Image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [idusuario, setIdusuario] = useState(null);

    const [mostrarImage, setMostrarImage] = useState(null);

    const [oldnamefile, setOldnamefile] = useState(null);

    const obtenerProducto = async () => {
        const getProducto = await useFetchObtenerProducto(id)
        productoRef.current = getProducto;
        setProducto(getProducto)
        marcaRef.current = getProducto.marca;
        setMarca(getProducto.marca)
        idproductoRef.current = getProducto.idproducto;
        setIdproducto(getProducto.idproducto)
        nombreRef.current = getProducto.nombre;
        setNombre(getProducto.nombre)
        descripcionRef.current = getProducto.descripcion;
        setDescripcion(getProducto.descripcion)
        stockRef.current = getProducto.stock;
        setStock(getProducto.stock)
        categoriaRef.current = getProducto.categoria;
        setCategoria(getProducto.categoria)
        precioRef.current = getProducto.precio;
        setPrecio(getProducto.precio)
        imageRef.current = getProducto.imagen;
        setImage(getProducto.imagen)
        idusuarioRef.current = getProducto.usuario.idusuario;
        setIdusuario(getProducto.usuario.idusuario)

        oldnamefileRef.current = acortarOldNameFile(getProducto.imagen);
        setOldnamefile(acortarOldNameFile(getProducto.imagen));
    }

    const acortarOldNameFile = (oldName) =>{
        const urlObj = new URL(oldName);
        const newName = urlObj.pathname.split('/').pop();
        return newName;
    }

    const handleMarcaChange = (event) => {
        setMarca(event.target.value);
    }

    const handleIdproductoChange = (event) => {
        setIdproducto(event.target.value);
    }

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    }

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    }

    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    }

    const handleStockChange = (event) => {
        setStock(event.target.value);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

        const previewUrl = URL.createObjectURL(file);
        setMostrarImage(previewUrl);

    };


    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            // Realizar la actualización utilizando useFetchActualizarProducto
            const data = await useFetchActualizarProducto(idproducto, marca, nombre, descripcion, stock, categoria, precio, idusuario, 
                selectedImage, oldnamefile);

            // Verificar la respuesta del servidor
            if (data === "Producto Registrado") {
                alert("Producto actualizado con éxito");
                // Redirigir a la página deseada (si es necesario)
                // redirigirAIndex();
            } else {
                alert("Hubo un problema al actualizar el producto");
            }
        } catch (error) {
            console.error("Error en handleSubmit:", error);
            alert("Hubo un error al procesar la solicitud");
        }
    };

    const redirigirAIndex = () => {
        window.location.href = '/';
    };

    useEffect(() => {
        obtenerProducto();
    }, []);


    if (!producto) {
        // Manejar el caso donde no hay detalles del producto
        return <p>No se encontraron detalles del producto.</p>;
    }

    return (
        <>
            <div className='detalle-container'>
                <form onSubmit={handleSubmit} className='detalle-container'>
                    <div className='detalle-imagen-edit'>
                        <img src={Image} style={{ height: '230px', width: '230px' }} alt="" />
                        <input
                            onChange={handleImageChange}
                            className='input-file'
                            type="file"
                            style={{ border: '2px solid #ddd', padding: '10px', borderRadius: '5px' }}
                        />
                        <label ><h2>Nueva Imagen</h2></label>
                        <img src={mostrarImage} style={{ height: '230px', width: '230px' }} alt="" />
                    </div>
                    <div className='detalle-descripcion-edit'>
                        <div className='detalle-marca'>
                            <input type='text' value={marca} onChange={handleMarcaChange} className='input-h3'></input>
                            <input type="text" style={{ width: '50px' }} value={idproducto} onChange={handleIdproductoChange} className='input-h5' readOnly />
                        </div>
                        <div className='detalle-nombre-edit'>
                            <textarea className='input-texarea-nombre' value={nombre} onChange={handleNombreChange} ></textarea>
                        </div>
                        <input type="text" value={descripcion} onChange={handleDescripcionChange} className='input-h5' />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <h2 className='h2'>S/. </h2> <input type='text' value={precio} onChange={handlePrecioChange} className='input-h2'></input>
                        </div>
                        <input type="number" value={stock} onChange={handleStockChange} className='input-h4' />

                        <div className='detalle-agregar'>
                            <button className='boton'>Grabar Cambios</button>
                        </div>
                    </div>
                </form>
            </div>

        </>

    );
};
import React, { useEffect, useState } from 'react'
import './styles.css';
import { AddCategory } from './AddCategory';
import { ProductGrid } from './ProductGrid';
import { Carrito } from './Carrito';
import { IniciarSesion } from './IniciarSesion';
import { Titulo } from './Titulo';
import { Menu } from './Menu';
import { FooterItem } from './FooterItem';
import { DetallesProducto } from './DetalleProducto';
import { Route, Routes } from 'react-router-dom';
import { MenuBar } from './MenuBar';
import { ProductGridCarrito } from './ProductGridCarrito';
import { ModalRegistro } from './ModalRegistro';
import { ModalLogin } from './ModalLogin';
import { EditarProducto } from './EditarProducto';
import { useObtenerIdUsuarioPorUrl } from './hooks/useObtenerIdUsuarioPorUrl';
import { ProductGridAll } from './ProductGridAll';
import { Administrar } from './Administrar';
import { MiCuenta } from './MiCuenta';
import { useVerifyUserAdmin } from './hooks/useVerifyUserAdmin';
import { Banner } from './Banner';

export const TiendaPlus = () => {

  //localStorage.removeItem("carrito");
  const [idusuario, setIdusuario] = useState([])

  const obtenerValorVariable = async () => {
    const nombreusuario = localStorage.getItem('usuario')
    const valorVariable = await useObtenerIdUsuarioPorUrl(nombreusuario)
    return valorVariable
  }

  const cargarIdUsuario = async () => {
    const valorVariable = await obtenerValorVariable();
    setIdusuario([valorVariable]);
  }

  const urlinicio = window.location.href;
  localStorage.setItem("urlinicio", urlinicio);

  const [contador, setContador] = useState(0)

  const [sesioniniciada, setSesioniniciada] = useState(false)

  const [filtroProducto, setFiltroProducto] = useState('')

  const [valorMenuBar, setValorMenuBar] = useState(false);

  const [verBanner, setVerBanner] = useState(true)

  const mostrarMenuBar = (nuevoValor) => {
    setValorMenuBar(nuevoValor);
  };

  const buscarProducto = (nuevoProduct) => {
    console.log("Nuevo producto:", nuevoProduct);
    setFiltroProducto(nuevoProduct);
    setVerBanner(false)
  }


  const verificarSession = () => {
    if (localStorage.getItem('usuario')) {
      setSesioniniciada(true);
    }
  }

  const sumarContador = () => {
    const nuevoCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidades = nuevoCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    setContador(totalCantidades);
    console.log("Sumar Contador", nuevoCarrito);
  }

  useEffect(() => {
    // Actualizar el contador al cargar la página
    sumarContador();
    verificarSession();
    cargarIdUsuario();
  }, []);

  const verifyUserAdmin = useVerifyUserAdmin();

  return (
    <>
      <div className='container'>
        <header>
          <Titulo></Titulo>
          <Menu onCambio={mostrarMenuBar}></Menu>
          {
            valorMenuBar && (<MenuBar cerrarventana={mostrarMenuBar} nuevoValorFilter={(valor) => buscarProducto(valor)}></MenuBar>)
          }
          <AddCategory onFilterProducts={(valor) => buscarProducto(valor)}></AddCategory>
          <div style={{display:'flex', width:'90%', justifyContent:'center'}}>
            <IniciarSesion></IniciarSesion>
            {
              verifyUserAdmin && (<Administrar></Administrar>)
            }


          </div>

          <Carrito contador={contador}></Carrito>
        </header>
        <div className='contenido'>
          <Routes>
            <Route path="/productos/:id" element={<DetallesProducto actualizarCounter={sumarContador} />} />
            <Route path="/editar_productos/:id" element={<EditarProducto />} />
            <Route path="/registrate" element={<ModalRegistro ></ModalRegistro>} />
            <Route path="/iniciar_sesion" element={<ModalLogin ></ModalLogin>} />
            <Route path="/miCuenta/*" element={<MiCuenta></MiCuenta>} />
            <Route path="/partner" element={
              idusuario.map((id) => (
                <ProductGrid
                  key={id}
                  idusuario={id}
                  actualizarCounters={sumarContador}
                  filtroPalabra={filtroProducto}
                  setearPalabra={buscarProducto}
                />
              ))} />
            <Route path="/" element={
              <>
                {
                  verBanner && (<Banner />)
                }
                {idusuario.map((id) => (
                  <ProductGridAll
                    key={id}
                    actualizarCounters={sumarContador}
                    filtroPalabra={filtroProducto}
                    setearPalabra={buscarProducto}
                  />
                ))}
              </>
            } />
            <Route path="/carrito/" element={
              idusuario.map((id) => (
                <ProductGridCarrito
                  key={id}
                  idusuario={id}
                  actualizarCounters={sumarContador}
                  filtroPalabra={filtroProducto}
                  setearPalabra={buscarProducto}
                />
              ))} />
          </Routes>
          {

          }
        </div>
        <FooterItem></FooterItem>
      </div>
    </>
  )
}

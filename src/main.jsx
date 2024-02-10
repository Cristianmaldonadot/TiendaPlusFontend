import React from 'react'
import ReactDOM from 'react-dom/client'
import { TiendaPlus } from './TiendaPlus.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TiendaPlus />
  </BrowserRouter>
)

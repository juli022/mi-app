import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import './index.css';
import DetalleProducto from './pages/DetalleProducto'
import MisReservas from './pages/MisReservas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

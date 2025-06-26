import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog'; // la nuova pagina che stiamo creando


function App() {
  return ( 
  
    <Router basename="/my-ecommerce-store">
      <div className="min-h-screen flex flex-col">
        <Navbar /> 
        <Routes>
          <Route path="/" element={
          <>
            <Hero />
            <Products />
          </>
        } />
          {/* Puoi aggiungere altre pagine qui */}
          <Route path="/prodotti/:categoryId" element={<Catalog />} />
          <Route path="/prodotti" element={<Catalog />} />
            
        </Routes>
      </div>
    </Router>
  
  );
}

export default App

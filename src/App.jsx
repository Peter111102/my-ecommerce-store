import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog'; // la nuova pagina che stiamo creando
import ProductDetail from './pages/ProductDetail'; // la pagina dei dettagli del prodotto

function App() {
  return ( 
  
    <Router basename="/my-ecommerce-store">
      <div className="min-h-screen flex flex-col">
        <Navbar /> 
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Catalog />
            </>
          }/>
          {/* Puoi aggiungere altre pagine qui */}
          <Route path="/prodotti/:categoryId" element={<Catalog />} />
          <Route path="/prodotti" element={<Catalog />} />
          <Route path="/prodotto/:productId" element={
          <>
            <ProductDetail />
            <Catalog />
          </>
          } />

        </Routes>
      </div>
    </Router>
  
  );
}

export default App

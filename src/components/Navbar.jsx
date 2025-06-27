import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Errore nel fetch delle categorie:', error));
  }, []);

  return (
    <nav className="w-full flex p-4 items-center justify-between text-white border-b-3 border-gray-800 relative">
      <Link to={`/`}>
        <h1 className="text-2xl font-bold">Fake Shop</h1>
      </Link>
      {/* Barra di ricerca */}
      <input
        type="text"
        placeholder="Cerca prodotti..."
        className="mx-4 p-2 rounded-lg text-white w-64 outline outline-2 outline-white"
      />

      <ul className="flex items-center list-none relative">
        <li
          className="mr-8 cursor-pointer relative px-4 py-2 h-full flex items-center"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Link to={`/prodotti`} onClick={() => setShowDropdown(false)}>
             <span className="hover:text-gray-300">Tutte le categorie</span>       
          </Link>

          {/* Dropdown */}
          {showDropdown && (
            <ul className="absolute top-10 left-0 bg-white text-black rounded shadow-lg p-2 w-40 z-10">
              {categories.map(category => (
                <li key={category.id} className="p-2 hover:bg-gray-200 rounded">
                  <Link to={`/prodotti/${category.id}`} onClick={() => setShowDropdown(false)}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li><a href="#" className="hover:text-gray-300 mr-8">Accedi / Registrati</a></li>
        <li><a href="#" className="hover:text-gray-300">Carrello</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

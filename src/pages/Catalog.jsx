import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';

function Catalog() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const isCatalog = location.pathname.startsWith('/prodotti');

  // Fetch categories
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Fetch prodotti
  useEffect(() => {
    setLoading(true);
    let url = 'https://api.escuelajs.co/api/v1/products?limit=20';
    if (categoryId) {
      url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}&limit=20`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="p-4">
      {/* Mostra il filtro solo se non sei nella home */}
      { isCatalog && (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">Catalogo Prodotti</h1>

          {/* Filtro per categorie */}
          <div className="mb-6 flex space-x-4 justify-center">
            <button onClick={() => navigate('/prodotti')} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Tutti
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => navigate(`/prodotti/${category.id}`)}
                className={`px-4 py-2 rounded ${parseInt(categoryId) === category.id ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prodotti */}
      {loading ? (
        <p>Caricamento prodotti...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Link to={`/prodotto/${product.id}`} key={product.id}>
              <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                <img src={product.images[0]} alt={product.title} className="h-48 mx-auto object-contain mb-4" />
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.price} €</p>
                <AddToCartButton product={product} />
          </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalog;

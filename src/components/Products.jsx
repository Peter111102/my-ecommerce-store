import { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = () => {
    if (loading) return;
    setLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        if (data.length < limit) {
          setHasMore(false);
        }
        setProducts(prev => [...prev, ...data]);
        setOffset(prev => prev + limit);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
        fetchProducts();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, offset]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <img
                src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/150'}
                alt={product.title || 'Prodotto senza titolo'}
                className="h-48 mx-auto object-contain mb-4"
             />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.price} €</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Aggiungi al carrello
            </button>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-8">Caricamento prodotti...</p>}
      {!hasMore && <p className="text-center mt-8">Non ci sono più prodotti.</p>}
    </div>
  );
}

export default Products;


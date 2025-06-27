import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Errore nel fetch:', error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p className="text-center mt-8">Caricamento...</p>;
  if (!product) return <p className="text-center mt-8">Prodotto non trovato.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
        🔙 Torna Indietro
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={product.images[0]} alt={product.title} className="w-full h-96 object-contain" />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-300 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">{product.price} €</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

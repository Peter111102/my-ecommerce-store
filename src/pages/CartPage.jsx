// src/pages/CartPage.jsx
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cartItems, addToCart, removeFromCart, removeProductCompletely, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Il tuo Carrello</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Il carrello è vuoto.</p>
          <button onClick={() => navigate('/prodotti')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Vai ai Prodotti
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border p-4 rounded-lg justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.images[0]} alt={item.title} className="h-16 w-16 object-contain" />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>{item.price} €</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => removeFromCart(item.id)} className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400">+</button>
                <button onClick={() => removeProductCompletely(item.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-4">
                  Rimuovi
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-xl font-bold mb-4">Totale: {totalPrice.toFixed(2)} €</h2>
            <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4">
              Svuota Carrello
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Procedi al Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;

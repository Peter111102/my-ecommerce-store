import { useCart } from '../context/CartContext';

function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
      }}
    >
      Aggiungi al carrello
    </button>
  );
}

export default AddToCartButton;

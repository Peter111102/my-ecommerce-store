import { Link } from 'react-router-dom';




function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 ">
      <h2 className="text-4xl font-bold mb-4">Benvenuto nel Fake Shop</h2>
      <p className="text-lg mb-6">Scopri i migliori prodotti al miglior prezzo!</p>
      <Link to="/prodotti">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Vai ai Prodotti
        </button>
      </Link>
    </section>
  )
}

export default Hero

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart(); // Ensure this matches your context implementation
  const cartCount = cart.length;

  return (
    <header className="bg-gray-900 text-white shadow-md w-full">
      <div className="max-w-full mx-auto flex justify-between items-center p-4 px-6">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
          🛍️ Cart Application
        </Link>
        <Link to="/cart" className="relative">
          <span className="text-xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;

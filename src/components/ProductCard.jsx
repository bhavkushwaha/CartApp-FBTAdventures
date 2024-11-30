import React from 'react';
import { useCart } from '../context/CartContext';

const getImagePath = (imageName) => require(`../images/${imageName}`);

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="border p-4 rounded shadow">
      <img src={getImagePath(product.image)} alt={product.name} className="w-full h-40 object-cover mb-4" />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
      <button
        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
        className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

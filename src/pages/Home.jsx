import React from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <div className="container mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6 text-center">Available Products</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

  );
};

export default Home;

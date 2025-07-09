import React, { useState } from 'react'
import { useProductContext } from '../../context/ProductContext';
import ProductCard from '../ProductCard';
import ProductPopup from '../ProductPopup';

const Women = () => {
  const { products, loading } = useProductContext();
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const handleAddToCart = (product, qty) => {
      setSelectedProduct(null);
    };

  // Filter for men's category
  const womenProducts = products.filter((p) => p.category === "womens-dresses");

  const womenWatch = products.filter((p) => p.category === "mens-watches");

  if (loading) return <div>Loading...</div>;

  return (
    <section className="px-[6%] py-[50px]">
      <h2 className="text-xl text-center text-[2rem] mb-6 font-bold"> New Arrivals</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {womenProducts.map((p) => (
          <ProductCard key={p.id} product={p} onClick={setSelectedProduct}/>
        ))}
      </ul>

       {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {womenWatch.map((p) => (
          <ProductCard key={p.id} product={p} onClick={setSelectedProduct}/>
        ))}
      </ul>
    </section>
  );
}

export default Women
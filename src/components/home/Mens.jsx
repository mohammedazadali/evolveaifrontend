// src/pages/Mens.jsx
import React, { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../ProductCard";
import ProductPopup from "../ProductPopup";

const Mens = () => {
  const { products, loading } = useProductContext();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product, qty) => {
    setSelectedProduct(null);
  };

  // Filter for men's category
  const mensProducts = products.filter((p) => p.newArrival === true);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="px-[6%] py-[50px]" id="shop">
      <h2 className="text-xl text-center text-[2rem] mb-6 font-bold">Best Seller</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {mensProducts.map((p) => (
          <ProductCard key={p.id} product={p} onClick={setSelectedProduct}/>
        ))}

         {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      </ul>
    </section>
  );
};

export default Mens;

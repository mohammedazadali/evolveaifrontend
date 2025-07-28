import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductPopup from '../components/ProductPopup'
import { useProductContext } from '../context/ProductContext';

const Mens = () => {

    const { products, loading } = useProductContext();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddToCart = (product, qty) => {
        setSelectedProduct(null);
    }

    // Filter
    const mensProduct = products.filter((p) => p.category === "Men");
  return (
        <section className="px-[6%] py-[50px]">
      <h2 className="text-xl text-center text-[2rem] mb-6 font-bold"> Mens</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {mensProduct.map((p) => (
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

    
    </section>
  )
}

export default Mens
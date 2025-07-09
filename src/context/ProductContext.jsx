// src/context/ProductContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
  try {
    const response = await axios.get("https://dantrendsapi-50029223867.development.catalystappsail.in/api/product/");
    console.log("Product API Response:", response.data.data);
    setProducts(response.data.data);
  } catch (error) {
    console.error("Failed to fetch products", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

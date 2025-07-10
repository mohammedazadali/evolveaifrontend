// components/ProductPopup.jsx
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "../hook/useCartActions";
import Rating from "./common/Rating";
import { useOrderAction } from "../hook/useOrderAction";

const ProductPopup = ({ product, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {onAddToCart} = useCartActions();
  const { placeOrder } = useOrderAction();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity((prev) => prev + 1);
  };

  const handleInputChange = (e) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value)));
    setQuantity(value);
  };

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-xl p-10 md:w-[60%]  shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-600 hover:text-black text-lg"
        >
          ✕
        </button>

        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 sm:max-w-[90px] overflow-x-auto sm:overflow-x-hidden image">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`product-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 md:w-20 h-14 md:h-23 object-contain rounded border cursor-pointer transition-transform hover:scale-105 ${
                    selectedImage === img
                      ? "border-[#A6C18F] border-2"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="bg-[#EDEFE8] rounded-lg p-4 flex items-center justify-center w-64 md:w-100 h-64 md:h-100">
              <img
                src={selectedImage}
                alt="Selected product"
                className="object-contain max-w-full max-h-full"
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-3">{product.title}</h2>
            <p className="text-sm text-gray-500 mb-3">{product.description}</p>
            <Rating rating={product.rating} className='mb-3'/>
            <p className="mt-3 mb-3 text-gray-700 font-semibold text-base">
              {product.discountPercentage > 0 && (
                <>
                  <span className="line-through text-sm text-gray-400 mr-2">
                    ₹
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="text-red-500 text-sm">
                    -{product.discountPercentage.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="ml-2 text-black text-base">
                ₹{product.price.toFixed(2)}
              </span>
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center border rounded">
                <button
                  onClick={handleDecrease}
                  className="px-2 py-1 text-lg font-bold hover:bg-gray-200"
                >
                  –
                </button>
                <input
                  type="number"
                  id="qty"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-12 text-center outline-none"
                />
                <button
                  onClick={handleIncrease}
                  className="px-2 py-1 text-lg font-bold hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
              onClick={() => onAddToCart(product, quantity)}
              className="mt-4 w-full bg-[#A6C18F] text-white py-2 rounded hover:bg-[#94B07F]"
            >
              Add to Cart
            </button>
            <button
              onClick={() => placeOrder(product, quantity)}
              className="mt-4 w-full border border-[#A6C18F] text-[#A6C18F] py-2 rounded hover:bg-[#94B07F] hover:text-white"
            >
              Buy Now
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;

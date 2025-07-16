import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  
  const {cart} = useCart()

  const placeOrder = async () => {
    if(!user){
      navigate('/login');
      return
    }
    try {
      const res = await axios.post(
        "https://dantrendsapi-50029223867.development.catalystappsail.in/api/cart/order",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Order placed successfully!");
      setCart(null);
    } catch (err) {
      alert("Failed to place order");
    }
  };



  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-xl">🛒 Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-[#A6C18F] text-white rounded hover:bg-[#8CA375]"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="px-[6%] py-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🛍️ Your Cart</h2>

      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li
            key={item.productId}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border rounded-lg p-4 bg-white shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
            <p className="font-bold text-black text-lg">
              ₹{item.price * item.quantity}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t pt-6">
        <p className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Total: ₹
          {cart.items
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
        <button
          onClick={placeOrder}
          className="px-6 py-2 bg-[#A6C18F] text-white rounded hover:bg-[#8CA375] transition duration-200"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;

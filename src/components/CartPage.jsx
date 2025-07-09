import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://dantrendsapi-50029223867.development.catalystappsail.in/api/cart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(res.data);
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!cart || cart.items.length === 0)
    return <p className="text-center py-10">🛒 Your cart is empty</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🛍️ Your Cart</h2>

      <ul className="space-y-6">
        {cart.items.map((item) => (
          <li
            key={item.productId}
            className="flex gap-4 items-center border p-4 rounded-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
            <p className="font-bold text-black">
              ₹{item.price * item.quantity}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <p className="font-semibold text-lg">
          Total: ₹
          {cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
        </p>
        <button
          onClick={placeOrder}
          className="mt-3 px-5 py-2 bg-[#A6C18F] text-white rounded hover:bg-[#94B07F]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;

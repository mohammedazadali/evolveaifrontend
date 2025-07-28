import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

export const useOrderAction = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const placeOrder = async (product, quantity = 1) => {
    if (!user || !user.token) {
      toast.info("Please login to continue.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "https://dantrendsapi-50029223867.catalystappsail.in/api/cart/order",
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      toast.success("Order placed successfully!");
      console.log("Order Response:", res.data);
    } catch (err) {
      toast.error("Failed to place order");
      console.error("Order Error:", err.response?.data || err.message);
    }
  };

  return { placeOrder };
};

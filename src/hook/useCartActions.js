import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

export const useCartActions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  const onAddToCart = async (product, quantity = 1) => {
    if (!user || !user.token) {
      toast.info("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "https://dantrendsapi-50029223867.catalystappsail.in/api/cart/add",
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Item added to cart!");
      fetchCart()
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to add item to cart.";
      toast.error(errMsg);
      console.error("Cart Error:", error.response || error.message);
    }
  };

  return { onAddToCart };
};

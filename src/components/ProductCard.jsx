// components/ProductCard.jsx
import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartActions } from "../hook/useCartActions";

const ProductCard = ({ product, onClick }) => {
  const {onAddToCart} = useCartActions();
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discount = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleCartClick = (e) => {
    e.stopPropagation(); // prevent triggering the onClick of <li>
    onAddToCart(product, 1);
  };

  return (
    <li
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl p-3 relative group transition-all duration-300 w-full max-w-[240px] mx-auto cursor-pointer"
    >
      <button className="absolute top-5 right-5 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10">
        <Heart
          size={16}
          className={hasDiscount ? "text-red-500" : "text-gray-600"}
        />
      </button>

      <div className="bg-[#EDEFE8] rounded-xl p-4 flex items-center justify-center h-48">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-[15px] font-medium leading-snug line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.oldPrice}
              </span>
            )}
            <span className="text-[15px] font-semibold text-black">
              ₹{product.price}
            </span>
            {hasDiscount && (
              <span className="text-[13px] text-red-400 font-medium">
                -{discount}%
              </span>
            )}
          </div>
          <button
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            onClick={handleCartClick}
          >
            <ShoppingBag size={16} className="text-gray-700" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;

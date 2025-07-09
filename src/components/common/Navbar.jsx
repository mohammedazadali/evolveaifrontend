import React, { useState, useRef, useEffect } from "react";
import { logo } from "../../assets/data";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b border-black sticky top-0 z-50">
      <div className="px-[6%] py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-[150px]" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-black transition">Mens</li>
          <li className="cursor-pointer hover:text-black transition">Womens</li>
          <li className="cursor-pointer hover:text-black transition">Kids</li>
          <li className="cursor-pointer hover:text-black transition">
            New & Featured
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-700 text-xl md:gap-6 relative">
          {/* Login/Signup or User */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#A3B18C] text-white text-sm px-4 py-2 rounded-md font-semibold hover:bg-[#8C9C7C] transition duration-300"
            >
              Login / Signup
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <User
                onClick={toggleDropdown}
                className="cursor-pointer hover:text-black"
                size={22}
                strokeWidth={1.8}
                title="User"
              />
              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-xl rounded-lg w-60 p-4 z-50 border border-gray-100 transition-all duration-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#A6C18F] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      {user.username}
                    </p>
                  </div>
                  <hr className="mb-3 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition w-full"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          <ShoppingCart
            className="cursor-pointer hover:text-black"
            size={22}
            strokeWidth={1.8}
            title="Cart"
            onClick={() => navigate("/cart")}
          />

          {/* Mobile Menu Toggle */}
          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden px-[6%] pb-4 space-y-3 text-gray-700 font-medium bg-white shadow absolute w-full py-3 z-40">
          <li className="cursor-pointer hover:text-black transition">Mens</li>
          <li className="cursor-pointer hover:text-black transition">Womens</li>
          <li className="cursor-pointer hover:text-black transition">Kids</li>
          <li className="cursor-pointer hover:text-black transition">
            New & Featured
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

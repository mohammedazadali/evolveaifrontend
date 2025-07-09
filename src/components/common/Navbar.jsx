import React, { useState } from "react";
import { logo } from "../../assets/data";
import { ShoppingCart, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full bg-white border-b border-black sticky top-0 z-50">
      <div className="px-[6%] py-5 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-[150px]" />
        </div>


        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-black transition">Mens</li>
          <li className="cursor-pointer hover:text-black transition">Womens</li>
          <li className="cursor-pointer hover:text-black transition">Kids</li>
          <li className="cursor-pointer hover:text-black transition">
            New & Featured
          </li>
        </ul>


        <div className="flex items-center gap-4 text-gray-700 text-xl md:gap-6">
          <User
            className="cursor-pointer hover:text-black"
            size={22}
            strokeWidth={1.8}
            title="Login / Account"
          />
          <ShoppingCart
            className="cursor-pointer hover:text-black"
            size={22}
            strokeWidth={1.8}
            title="Cart"
          />


          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>



      <ul className={`md:hidden px-[6%] pb-4 space-y-3 text-gray-700 font-medium bg-white shadow absolute w-full py-3 ${menuOpen ? 'active' : 'inactive'}`}>
        <li className="cursor-pointer hover:text-black transition">Mens</li>
        <li className="cursor-pointer hover:text-black transition">Womens</li>
        <li className="cursor-pointer hover:text-black transition">Kids</li>
        <li className="cursor-pointer hover:text-black transition">
          New & Featured
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

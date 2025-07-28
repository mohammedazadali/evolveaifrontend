import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#a9b786] mb-5">DANTRENDS</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Explore curated fashion essentials and statement pieces for women, men, and kids. Be bold. Be timeless. Be you.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide text-[#f3f3f3]">Shop</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="/women" className="hover:text-[#a9b786] transition">Women</a></li>
            <li><a href="/men" className="hover:text-[#a9b786] transition">Men</a></li>
            <li><a href="/kids" className="hover:text-[#a9b786] transition">Kids</a></li>
            <li><a href="/new" className="hover:text-[#a9b786] transition">New Arrivals</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide text-[#f3f3f3]">Support</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="/contact" className="hover:text-[#a9b786] transition">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-[#a9b786] transition">FAQs</a></li>
            <li><a href="/returns" className="hover:text-[#a9b786] transition">Returns & Exchanges</a></li>
            <li><a href="/privacy" className="hover:text-[#a9b786] transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide text-[#f3f3f3]">Stay Updated</h3>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-full text-black focus:outline-none text-sm placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full bg-[#a9b786] hover:bg-[#95a36e] transition text-white text-sm font-medium py-2 rounded-full shadow-md"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-5 mt-6">
            <a href="#" className="hover:text-[#a9b786] transition text-lg"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#a9b786] transition text-lg"><FaInstagram /></a>
            <a href="#" className="hover:text-[#a9b786] transition text-lg"><FaTwitter /></a>
            <a href="#" className="hover:text-[#a9b786] transition text-lg"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-14 pt-6 text-center text-xs text-gray-500 tracking-wide">
        &copy; {new Date().getFullYear()} DANTRENDS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

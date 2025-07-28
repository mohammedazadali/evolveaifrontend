import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center text-center px-6 py-20">
      <h1 className="text-9xl font-extrabold text-[#a9b786] tracking-widest">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mt-6 text-gray-800">Oops! Page Not Found</h2>
      <p className="text-gray-500 text-lg mt-3 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved. But don’t worry, fashion is still just a click away.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#a9b786] hover:bg-[#95a36e] text-white font-medium px-6 py-3 rounded-full shadow transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;

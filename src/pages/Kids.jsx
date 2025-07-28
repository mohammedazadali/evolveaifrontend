import React from 'react';

const Kids = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fefdfb] to-[#f0f4ea] px-6 py-12 text-center">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#d69c7c] tracking-tight">
          Kids’ Collection Coming Soon!
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl">
          We're preparing something colorful and comfy for the little ones. Stay tuned for our fun-filled launch!
        </p>
        <div className="inline-block mt-6">
          <span className="inline-block bg-[#d69c7c] text-white font-medium px-6 py-3 rounded-full shadow hover:bg-[#c4886b] transition">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default Kids;

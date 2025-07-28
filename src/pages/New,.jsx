import React from 'react';

const New = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9fafb] to-[#edf0e3] px-6 py-12 text-center">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-5xl sm:text-6xl font-semibold text-[#7c8d5b] ">
          Something New is Coming
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl">
          We’re working on something exciting. Stay tuned for new features and updates launching soon!
        </p>
        <div className="inline-block mt-6">
          <span className="inline-block bg-[#a9b786] text-white font-medium px-6 py-3 rounded-full shadow hover:bg-[#95a36e] transition">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default New;

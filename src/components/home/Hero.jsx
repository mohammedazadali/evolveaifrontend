import React, { useState } from "react";
import { hero, herobg, login, watch } from "../../assets/data"; // Replace with actual path to your image
import { IoPlayCircleOutline } from "react-icons/io5";

const Hero = () => {
  const scrollToShop = () => {
    const section = document.getElementById("shop");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className=" relative  overflow-hidden h-[100%] flex justify-center items-center">
      <div className="absolute left-0 top-0 h-full w-[65%] s bg-[#EDEFE8] clip-diagonal -z-10" />
      <div className=" px-[6%] py-16 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="basis-[50%]">
          <h1 className="md:text-[58px] text-[32px] font-bold leading-tight mb-6">
            Wear the Trend, Own the Moment! with DanTrend
          </h1>
          <p className="sm:text-lg text-sm font-extralight text-gray-600 mb-8">
            Your wardrobe deserves a glow-up! Discover fashion that’s fresh,
            fierce, and totally you.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
            <button
              className="bg-black text-white py-3 px-6 rounded-full text-base font-semibold  transition duration-300"
              onClick={scrollToShop}
            >
              Shop Now
            </button>

            <button
              className="border border-black text-black py-3 px-6 rounded-full text-base font-semibold  transition duration-300 flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              <IoPlayCircleOutline size={22} /> Watch Now
            </button>
          </div>
        </div>

        <div className="basis-[50%]">
          <img src={login} alt="Fashion Hero" className="w-[100%]" />
        </div>
      </div>

{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-[90%] relative p-0 animate-fadeInUp">

      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3  z-[999] right-4 text-gray-700 text-3xl cursor-pointer hover:text-black transition"
        aria-label="Close video"
      >
        &times;
      </button>

      {/* Video Container */}
      <div className="overflow-hidden rounded-2xl aspect-video">
        <video
          className="w-full h-full object-cover"
          controls
          autoPlay
          muted
        >
          <source src={watch} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
)}


    </section>
  );
};

export default Hero;

import React from "react";
import { hero, herobg, login } from "../../assets/data"; // Replace with actual path to your image
import { IoPlayCircleOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <section className=" relative md:h-screen overflow-hidden h-[100%] flex justify-center items-center" >
      <div className="absolute left-0 top-0 h-full w-[65%] s bg-[#EDEFE8] clip-diagonal -z-10" />
      <div className=" px-[6%] py-16 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="basis-[50%]">
          <h1 className="text-[58px] font-bold leading-tight mb-6">
            Wear the Trend, Own the Moment! with DanTrend
          </h1>
          <p className="text-lg font-extralight text-gray-600 mb-8">
            Your wardrobe deserves a glow-up! Discover fashion that’s fresh,
            fierce, and totally you.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <button className="bg-black text-white py-3 px-6 rounded-full text-base font-semibold hover:bg-[#5E705A] transition duration-300">
              Shop Now
            </button>

            <button className="border border-black text-black py-3 px-6 rounded-full text-base font-semibold hover:bg-[#5E705A] transition duration-300 flex items-center gap-2">
              <IoPlayCircleOutline size={22} /> Watch Now
            </button>
          </div>
        </div>

        <div className="basis-[50%]">
          <img src={login} alt="Fashion Hero" className="w-[100%]"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;

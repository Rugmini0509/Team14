import React from "react";
import { assets } from "../quickcart_assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Banner Text & Button */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center px-4 md:px-20 lg:px-24 pb-16 md:pb-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-md md:max-w-lg lg:max-w-3xl leading-tight lg:leading-snug text-gray-900">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        {/* CTA Buttons */}
        <div className="flex items-center mt-6 font-medium">
          {/* Mobile button */}
          <Link
            to="/products"
            className="md:hidden flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded text-white"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>

          {/* Desktop button */}
          <Link
            to="/products"
            className="hidden md:flex items-center gap-2 px-9 py-3 bg-green-600 hover:bg-green-700 transition rounded text-white"
          >
            Shop Now
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

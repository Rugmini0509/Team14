import React from "react";
import { assets } from "../quickcart_assets/assets";
import { categories } from "../quickcart_assets/assets";
import { useAppContext } from "../context/AppContext";
const Categories = () => {
const {navigate} = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        {categories.map((Category, index) => (
          <div key={index} className="group cursor-pointer py-5 gap-2 rounded-lg flex flex-col justify-center items-center"
          style={{backgroundColor:Category.bgColor}}

          onClick={()=>{
            navigate(`/products/${Category.path.toLowerCase()}`);
            scrollTo(0,0)
          }}
          >
            <img
              className="group-hover:scale-108 transition max-w-28"
              src={Category.image}
              alt={Category.text}
            />
            <p className="text-sm font-medium">{Category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

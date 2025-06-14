import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../quickcart_assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { Product } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  const filteredProducts = Product.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase() && product.inStock
  );

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max mb-4">
          <p className="text-2xl font-medium uppercase">{searchCategory.text}</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 m-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductCategory;

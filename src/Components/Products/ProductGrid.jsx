import React from "react";
import { NavLink } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => {
        return (
          <NavLink key={index} to={`/product/${product._id}`} className="block">
            <div className="bg-white rounded-lg">
              <div className="w-full h-96 mb-2">
                <img
                  src={`http://localhost:9000${product.images[0].url}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-sm mb-2 ml-1">{product.name}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter ml-1">
                ${product.price}
              </p>
            </div>
          </NavLink>
        )})}
      </div>
    </>
  );
};

export default ProductGrid;

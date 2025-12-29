import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import apiConfig from "../../API/apiConfig.js";
import Slider from "react-slick";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await apiConfig.get("/products/new-arrivals");

        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewArrivals();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };



  return (
    <>
      <section className="pb-16 px-4 sm:px-12">
        <div className="text-center mb-10 relative">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Explore New Arrivals
          </h2>
          <p className="text-md sm:text-lg text-gray-600 mb-8">
            Discover the latest styles straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion.
          </p>
          {/* <div className="absolute right-0 bottom-[-60px] flex gap-3">
            <button onClick={PrevArrow} className="p-2 rounded border bg-white text-black">
              <FiChevronLeft className="text-2xl" />
            </button>
            <button className="p-2 rounded border bg-white text-black">
              <FiChevronRight className="text-2xl" />
            </button>
          </div> */}
        </div>

        {/* Scrollable content */}
        {/* Slick Slider */}
        {/* <div className="px-10 relative"> */}
        <Slider {...settings}>
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="px-3 relative "
            >
              <NavLink to={`/product/${product._id}`} className="block">
                <img
                  src={`http://localhost:9000${product.images[0].url}`}
                  alt={product.images[0].altText}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-[#d73b5a] p-4 mx-3 rounded-b-lg">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">${product.price}</p>
                </div>
              </NavLink>
            </div>
          ))}
        </Slider>
        {/* </div> */}
      </section>
    </>
  );
};

export default NewArrivals;

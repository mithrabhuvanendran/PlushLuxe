import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import apiConfig from "../../API/apiConfig.js";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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

  return (
    <section className="pb-16 px-7 sm:px-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Explore New Arrivals
        </h2>
        <p className="text-md sm:text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={20}
        grabCursor={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {newArrivals.map((product) => (
          <SwiperSlide key={product._id}>
            <NavLink to={`/product/${product._id}`} className="block relative">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText}
                className="w-full h-[500px] object-cover rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md text-[#d73b5a] p-4 rounded-b-lg">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;

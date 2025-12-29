import React, { useEffect, useState } from "react";
import Hero from "../Components/Layout/Hero";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductDetails from "../Components/Products/ProductDetails";
import FeaturedCollection from "../Components/Products/FeaturedCollection";
import FeaturesSection from "../Components/Products/FeaturesSection";
import ProductGrid from "../Components/Products/ProductGrid";
import {useDispatch,  useSelector } from "react-redux";
import apiConfig from "../API/apiConfig";
import { fetchProductsByFilters } from "../redux/thunk/productsThunk";

const Home = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products)
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection (Top Wears for Women)
    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Top Wear",
      limit: 8
    }))

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await apiConfig.get("products/best-seller");
        // console.log(response);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <>
      <div>
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />

        {/* Best seller */}
        <section className="grid place-items-center pb-12 px-4 sm:px-12 ">
          <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
          {bestSellerProduct ? (
            <ProductDetails productId={bestSellerProduct._id} />
          ) : (
            <p className="text-center">Loading best seller product ...</p>
          )}
        </section>

        {/* Top Wears for Women */}
        <div className="grid place-items-center px-4 sm:px-8 xl:px-16 mt-4 mb-10">
          <h2 className="text-3xl text-center font-bold mb-12">
            Top Wears for Women
          </h2>

          <ProductGrid products={products} loading={loading} error={error} />
        </div>

        <FeaturedCollection />
        <FeaturesSection />
      </div>
    </>
  );
};

export default Home;

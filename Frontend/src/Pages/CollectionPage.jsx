import React, { useContext, useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Products/FilterSidebar";
import SortOptions from "../Components/Products/SortOptions";
import ProductGrid from "../Components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/thunk/productsThunk";
import { GlobalContext } from "../Context/Context";

const CollectionPage = () => {
  const {collection} = useParams()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state) => state.products)
  const queryParams = Object.fromEntries([...searchParams])
  // const [products, setProducts] = useState([]);
  const {isSidebarOpen, setIsSidebarOpen} = useContext(GlobalContext)

  useEffect(() => {
    dispatch(fetchProductsByFilters({collection, ...queryParams}))
  }, [dispatch, collection, searchParams]);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-0 lg:gap-0 ">
        {/* Mobile filter button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden outline outline-[#d73b5a] hover:bg-[#d73b5a] hover:text-white p-2 flex justify-center items-center"
        >
          <FaFilter className="mr-2 hover:text-white" />
          Filters
        </button>

        {/* Filter Sidebar */}
        <div
          className="hidden lg:block lg:w-70 h-fit lg:overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Clicking inside sidebar → stopPropagation() prevents closing
        >
          <FilterSidebar />
        </div>
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 h-dvh w-50 z-50 overflow-y-auto bg-white transition-transform duration-300 lg:hidden ">
            <FilterSidebar />
          </div>
        )}
        <div className=" grow p-4 lg:p-5 ml-0  lg:ml-10 ">
          <h2 className="text-2xl uppercase mb-4">All Collections</h2>

          {/* Sort options */}
          <SortOptions />

          {/* Product Grid */}
          <ProductGrid products={products} loading={loading} error={error}/>
        </div>
      </div>
    </>
  );
};

export default CollectionPage;

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ProductGrid from "./ProductGrid.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/thunk/productsThunk.js";
import { addToCart } from "../../redux/thunk/cartThunk.js";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;
  // console.log(productFetchId);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      const imageURL = selectedProduct.images[0].url;
      setMainImage(imageURL);
    }
  }, [selectedProduct]); // React runs useEffect once after first render and runs only when selectedProduct changes i.e. when a new object is added

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and a color before adding to cart.");
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user ? user._id : null,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {selectedProduct && (
        <div className="lg:px-12 xl:px-18">
          <div className="px-4 pt-8 sm:p-8 ">
            <div className="flex flex-col md:flex-row gap-5 ">
              {/* Left Thumbnails */}
              <div className="hidden md:flex flex-col gap-4">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${image.url}`}
                    alt={image.altText}
                    onClick={() =>
                      setMainImage(`${image.url}`)
                    } // updates the mainImage when clicked
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                  />
                ))}
              </div>

              {/* Main image */}
              <div className="md:w-1/2 h-[500px] sm:h-[600px]">
                <div className="mb-4 h-full">
                  <img
                    src={mainImage}
                    alt="Main Product"
                    className="w-full h-full object-cover rounded-lg "
                  />
                </div>
              </div>
              {/* Mobile Thumbnail */}
              <div className="md:hidden overflow-x-scroll flex gap-4 mb-4">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText}
                    onClick={() =>
                      setMainImage(image.url)
                    }
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                  />
                ))}
              </div>

              {/* Right side */}
              <div className="md:w-1/2 md:ml-10">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                  {selectedProduct.name}
                </h1>

                <p className="text-lg text-gray-600 mb-1 line-through">
                  {selectedProduct.originalPrice &&
                    `$${selectedProduct.originalPrice}`}
                </p>

                <p className="text-xl text-gray-500 mb-2">
                  ${selectedProduct.price}
                </p>

                <p className="text-gray-600 mb-4">
                  {selectedProduct.description}
                </p>

                <div className="mb-4">
                  <p className="text-gray-700">Color:</p>
                  <div className="flex gap-2 mt-2">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border hover:cursor-pointer ${
                          selectedColor === color
                            ? "border-4 border-black"
                            : "border-gray-300"
                        }`}
                        style={{
                          backgroundColor: color
                            .split(" ")
                            .join("")
                            .toLowerCase(),
                          filter: "brightness(0.5)",
                        }}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700">Size:</p>
                  <div className="flex gap-2 mt-2">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded border hover:cursor-pointer ${
                          selectedSize === size ? "bg-black text-white" : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700">Quantity:</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => handleQuantityChange("minus")}
                      className="w-7 h-9 bg-gray-200 rounded text-lg hover:cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("plus")}
                      className="w-7 h-9 bg-gray-200 rounded text-lg hover:cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isButtonDisabled}
                  className={`bg-[#d73b5a] text-white py-2 px-6 rounded w-full mb-4 ${
                    isButtonDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-green-600"
                  }`}
                >
                  {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                </button>

                <div className="mt-4 text-gray-700">
                  <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                  <table className="w-full text-left text-sm text-gray-600">
                    <tbody>
                      <tr>
                        <td className="py-1">Brand</td>
                        <td className="py-1">{selectedProduct.brand}</td>
                      </tr>
                      <tr>
                        <td className="py-1">Material</td>
                        <td className="py-1">{selectedProduct.material}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <section className="grid place-items-center pt-12 px-4 sm:px-12 ">
            <h2 className="text-3xl text-center font-bold mb-4">
              You May Also Like
            </h2>
            <div className="pt-10">
              <ProductGrid
                products={similarProducts}
                loading={loading}
                error={error}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProductDetails;

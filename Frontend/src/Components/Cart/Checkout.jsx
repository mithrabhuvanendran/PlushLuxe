import React, { useEffect, useState } from "react";
import CollectionPage from "../../Pages/CollectionPage";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../API/apiConfig";
import { createCheckout } from "../../redux/thunk/checkoutThunk";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  // const [shippingAddress, setShippingAddress] = useState({
  //   firstName: "",
  //   lastName: "",
  //   address: "",
  //   city: "",
  //   postalCode: "",
  //   country: "",
  //   phone: "",
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Ensure the cart is loading before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (data) => {
    // console.log("FORM DATA 👉", data);
    // console.log(cart.products);
    // e.preventDefault();
    // setCheckoutId(123);
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: {
            // firstName: data.firstName,
            // lastName: data.lastName,
            address: data.address,
            city: data.city,
            postalCode: data.postalCode,
            country: data.country,
            // phone: data.phone,
          },
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      // console.log(res);
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); // set checkout ID if checkout was successful
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    // console.info("Payment Successful", details);
    try {
      const response = await apiConfig.put(
        `/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment was successful
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await apiConfig.post(
        `/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading cart ...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <>
      <div className="grid place-items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl py-10 px-6 tracking-tighter">
          {/* Left Section */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl uppercase mb-6">Checkout</h2>
            <form onSubmit={handleSubmit(handleCreateCheckout)}>
              <h3 className="text-lg mb-4">Contact Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={user ? user.email : ""}
                  className="w-full p-2 border rounded"
                  disabled
                />
              </div>
              <h3 className="text-lg mb-4">Delivery</h3>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">First Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    {...register("firstName", {
                      required: "Enter the first name",
                    })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    {...register("lastName", {
                      required: "Enter the last name",
                    })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 ">Address:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-4"
                  {...register("address", {
                    required: "Enter an address",
                  })}
                />
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">City:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    {...register("city", {
                      required: "Enter a city",
                    })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Postal Code:</label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded"
                    {...register("postalCode", {
                      required: "Enter a postal code",
                    })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700">Country:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-4 "
                  {...register("country", {
                    required: "Enter a country",
                  })}
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone:</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded mb-4"
                  maxLength="10"
                  {...register("phone", {
                    required: "Enter a number",
                  })}
                />
              </div>
              <div className="mt-6">
                {!checkoutId ? (
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded"
                  >
                    Continue to Payment
                  </button>
                ) : (
                  <div>
                    <h3 className="text-lg mb-4">Pay with PayPal</h3>
                    <PaypalButton
                      amount={cart.totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={(err) => alert("Payment failed. Try again.")}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
          {/* Right section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg mb-4">Order Summary</h3>
            <div className="border-t border-gray-300 py-4 mb-4">
              {cart.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between py-2 border-b border-gray-300"
                >
                  <div className="flex items-start">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-24 object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-md">{product.name}</h3>
                      <p className="text-gray-500">Size: {product.size}</p>
                      <p className="text-gray-500">Color: {product.color}</p>
                    </div>
                  </div>
                  <p className="text-xl">
                    ${product.price?.toLocaleString() * product.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-lg mb-4">
              <p>Subtotal</p>
              <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between text-lg mb-4">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="flex items-center justify-between text-lg mb-4 border-t pt-4">
              <p>Total</p>
              <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

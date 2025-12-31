import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slice/cartSlice";

const OrderConfirmation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {checkout} = useSelector((state) => state.checkout)

  // Clear the cart when the order is confirmed
  useEffect(() => {
    if(checkout && checkout._id) {
      dispatch(clearCart())
      localStorage.removeItem("cart")
    } else {
      navigate("/my-orders")
    }
  }, [checkout, dispatch, navigate])

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // Add 10 days to the order date
    return orderDate.toLocaleDateString();
  };

  return (
    <>
    <div className="grid place-items-center">
      <div className="w-full sm:w-11/12 lg:w-3/4 px-2 py-6 sm:p-6 ">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
          Thank You for Your Order!
        </h1>

        {checkout && (
          <div className="p-3 sm:p-6 rounded-lg sm:border sm:border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-10 sm:mb-20">
              {/* Order Id and date */}
              <div>
                <h2 className="text-xl font-semibold">
                  Order ID: {checkout._id}
                </h2>
                <p className="text-gray-500">
                  Order Date:{" "}
                  {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>
              {/* Estimated delivery */}
              <div>
                <p className="text-emerald-700 text-sm">
                  Estimated Delivery:{" "}
                  {calculateEstimatedDelivery(checkout.createdAt)}
                </p>
              </div>
            </div>
            {/* Ordered Items */}
            <div>
              {checkout.checkoutItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-center sm:justify-between mb-10 sm:mb-4"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-48 h-48 sm:w-16 sm:h-16 object-cover rounded-md sm:mr-4"
                    />

                    <div>
                      <h4 className="text-md font-semibold">{item.name}</h4>
                      <p className="text-center sm:text-start text-sm text-gray-500">
                        {item.color} | {item.size}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-center sm:text-start text-md font-semibold">${item.price * item.quantity}</h2>
                    <p className="text-center sm:text-start text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Payment and delivery info */}
            <div className="grid grid-cols-2 gap-8">
                {/* Payment info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Payment</h4>
                    <p className="text-gray-600">PayPal</p>
                </div>
                {/* Delivery info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                    <p className="text-gray-600">
                        {checkout.shippingAddress.address}
                    </p>
                     <p className="text-gray-600">
                        {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
                    </p>
                </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default OrderConfirmation;

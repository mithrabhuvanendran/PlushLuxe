import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/thunk/cartThunk";

const CartContents = ({cart, userId, guestId}) => {
  const dispatch = useDispatch()

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta
    if(newQuantity >=1 ) {
      dispatch(updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
        size,
        color
      }))
    }
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({
      productId,
      userId,
      guestId,
      color,
      size
    }))
  }
  return (
    <>
      <div>
        {cart.products.map((product) => (
          <div key={product.productId} className="flex items-start justify-between py-4 border-b">
            <div>
              <img
                src={`${import.meta.env.VITE_URL}${product.image}`}
                alt=""
                className="w-20 h-24 object-cover mr-4 rounded"
              />
            </div>
            <div className="grow">
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)} className="border rounded w-6 h-8 text-xl font-medium hover:cursor-pointer">-</button>
                <span className="mx-4">{product.quantity}</span>
                <button onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)} className="border rounded w-6 h-8 text-xl font-medium hover:cursor-pointer">+</button>
              </div>
            </div>
            <div>
                <p className="font-medium">$ {product.price.toLocaleString()}</p>
                <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)} className="hover:cursor-pointer">
                    <RiDeleteBin3Line className="w-6 h-6 mt-2 text-red-600"/>
                </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartContents;

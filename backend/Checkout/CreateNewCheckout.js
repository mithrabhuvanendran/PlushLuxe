import mongoose from "mongoose";
import Checkout from "../models/Checkout.js";

const CreateNewCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).send({ msg: "No items in checkout." });
  }

  try {
    const formattedItems = checkoutItems.map((item) => ({
      productId: new mongoose.Types.ObjectId(item.productId), // ✅ FIX
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: formattedItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: false,
    });
    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).send(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session", error);
    res.status(500).send("Server error");
  }
};

export default CreateNewCheckout;

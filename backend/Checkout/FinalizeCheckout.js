import Cart from "../models/Cart.js";
import Checkout from "../models/Checkout.js";
import Order from "../models/Order.js";

const FinalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).send({ msg: "Checkout not found." });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create a final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      // Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(200).send(finalOrder);
    } else if (checkout.isFinalized) {
      return res.status(400).send({ msg: "Checkout already finalized." });
    } else {
      return res.status(400).send({ msg: "Checkout is not paid." });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
};

export default FinalizeCheckout;

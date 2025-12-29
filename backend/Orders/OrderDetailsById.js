import Order from "../models/Order.js";

const OrderDetailsById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).send({ msg: "Order not found." });
    }

    // Return the full order details
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default OrderDetailsById;

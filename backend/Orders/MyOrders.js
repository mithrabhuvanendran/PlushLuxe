import Order from "../models/Order.js";

const MyOrders = async (req, res) => {
  try {
    // Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // sort by most recent orders

    res.send(orders);
  } catch (error) {
    // console.log(error);
    res.status(500).send("Server error");
  }
};

export default MyOrders;

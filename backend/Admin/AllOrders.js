import Order from "../models/Order.js";

const AllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");

    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default AllOrders;

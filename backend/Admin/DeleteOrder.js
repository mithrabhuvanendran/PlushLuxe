import Order from "../models/Order.js";

const DeleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      await order.deleteOne();
      res.send({ msg: "Order removed." });
    } else {
      res.status(404).send({ msg: "Order not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default DeleteOrder;

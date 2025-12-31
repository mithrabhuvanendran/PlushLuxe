import Order from "../models/Order.js";

const UpdateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name");

    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
    } else {
        return res.status(404).send({msg: "Order not found."})
    }

    const updatedOrder = await order.save();
    return res.send(updatedOrder);
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
};

export default UpdateOrderStatus;

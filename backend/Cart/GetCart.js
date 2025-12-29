import Cart from "../models/Cart.js";

// Helper function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  } else {
    return null;
  }
};

const GetCart = async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    let cart = await getCart(userId, guestId);

    if (cart) {
      return res.send(cart);
    } else {
      return res.status(404).send({ msg: "Cart not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default GetCart;

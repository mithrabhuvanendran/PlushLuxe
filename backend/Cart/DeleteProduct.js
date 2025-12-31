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

const DeleteProduct = async (req, res) => {
  const { productId, size, color, userId, guestId } = req.body;

  try {
    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).send({ msg: "Cart not found." });

    const productIndex = await cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.color === color && p.size === size
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1); // remove product

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).send(cart);
    } else {
      return res.status(404).send({ msg: "Product not found in cart." });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
};

export default DeleteProduct;

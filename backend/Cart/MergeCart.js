import Cart from "../models/Cart.js";

const MergeCart = async (req, res) => {
  const { guestId } = req.body;

  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(404).send({ msg: "Guest cart is empty." });
      }

      if (userCart) {
        // Merge guest cart to user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // If the item exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Otherwise, add the guestItem to the user cart
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting the guest cart", error);
        }

        res.status(200).send(userCart)
      } else {
        // If the user has no existing cart, assign the guest user to the cart
        guestCart.user = req.user._id
        guestCart.guestId = undefined

        await guestCart.save()
        res.status(200).send(guestCart)
      }
    } else {
        if(userCart) {
            // Guest cart has been already merged, return the user cart
            return res.status(200).send(userCart)
        }

        res.status(404).send({msg: "Guest cart not found."})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default MergeCart;

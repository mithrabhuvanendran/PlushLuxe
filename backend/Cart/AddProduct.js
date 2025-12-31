import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

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

const AddProduct = async (req, res) => {
  const { productId, size, color, quantity, userId, guestId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).send({ msg: "Product not found." });

    // Determine if the user is logged in or guest
    let cart = await getCart(userId, guestId);

    // If the cart exists, update it
    if (cart) {
      const productIndex = await cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // If the product already exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });

        // Recalculate the total price
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      }
      await cart.save();
      res.status(200).send(cart);
    } else {
      // Create a new cart for the guest or a user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      res.status(201).send(newCart);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
};

export default AddProduct;

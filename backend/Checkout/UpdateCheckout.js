import Checkout from "../models/Checkout.js";

const UpdateCheckout = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if(!checkout) {
        return res.status(404).send({msg: "Checkout not found."})
    }

    if(paymentStatus === "paid") {
        checkout.isPaid = true
        checkout.paymentStatus = paymentStatus
        checkout.paymentDetails = paymentDetails
        checkout.paidAt = Date.now()

        await checkout.save()

        res.status(200).send(checkout)
    } else {
        return res.status(400).send({msg: "Invalid Payment Status"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default UpdateCheckout;

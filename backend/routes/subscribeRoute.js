import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// Handle newsletter subscription
// Access Public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ msg: "Email is required." });
  }

  try {
    // Check if the email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).send({ msg: "Email is already subscribed" });
    }

    subscriber = await Subscriber.create({ email });
    await subscriber.save()

    res.status(201).send({msg: "Successfully subscribed to the newsletter!"})
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
});

export default router

import User from "../models/User.js";
import bcrypt from "bcryptjs"

const NewUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.send(400).send({ msg: "User already exists." });
    }

    user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: role || "customer",
    });

    await user.save();
    res.status(201).send({ msg: "User created successfully." });
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
};

export default NewUser;

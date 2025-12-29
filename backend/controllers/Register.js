import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const { name, email, password } = req.body;
  //   console.log({ name, email, password });

  try {
    if (!name || !email || !password) {
      return res.status(404).send({ msg: "All fields are required!" });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ msg: "User already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // res.status(201).send({
    //   msg: "New user registered",
    //   _id: newUser._id,
    //   email: newUser.email,
    // });

    // Create JWT Payload
    const payload = { _id: newUser._id, role: newUser.role };

    // Sign and return the token along with user data
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "40h",
    });

    // Send the user and token in response
    res.status(201).send({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    console.info(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

export default Register;

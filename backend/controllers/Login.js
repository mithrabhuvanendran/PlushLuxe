import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send({ msg: "All fields are required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: "Email not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: "Invalid credential!" });
    }

    // Create JWT payload
    const payload = { _id: user._id, role: user.role };

    // Sign and return the token along with user data
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "40h",
    });

    // Send the user and token in response
    res.send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.info(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

export default Login;

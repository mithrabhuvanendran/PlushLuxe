import User from "../models/User.js";
import jwt from "jsonwebtoken";

const Protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send({ msg: "No token, authorization denied" });
  }

    try {

      const decoded = await jwt.verify(token, process.env.JWT_SECRET); // here the token is decoded to give the payload,which we created in Login
      // console.info(decoded);

      req.user = await User.findById(decoded._id).select("-password");
      // console.info(req.user);   
      next();
    } catch (error) {
      res.status(400).send({ msg: "Not authorized, token failed." });
    }
};




export default Protect;

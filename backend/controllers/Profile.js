import User from "../models/User.js";

const Profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.send({
      msg: "User authorized",
      user,
    });
  } catch (error) {}
};

export default Profile;

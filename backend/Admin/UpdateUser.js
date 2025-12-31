import User from "../models/User.js";

const UpdateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }

    const updatedUser = await user.save();
    res.send({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
};

export default UpdateUser;

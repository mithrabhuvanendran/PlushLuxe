import User from "../models/User.js";

const DeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.send({ msg: "User deleted successfully." });
    } else {
      return res.status(404).send({ msg: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default DeleteUser;

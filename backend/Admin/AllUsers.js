import User from "../models/User.js";

const AllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
};

export default AllUsers;

// Middleware to check if the user is an admin
const Admin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(400).send({ msg: "Not authorized as an admin" });
  }
};

export default Admin;

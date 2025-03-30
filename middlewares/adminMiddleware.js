const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access Denied: Please contact the administrator" });
  }
  next();
};

module.exports = adminMiddleware;

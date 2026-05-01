const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "7d" }
  );
};
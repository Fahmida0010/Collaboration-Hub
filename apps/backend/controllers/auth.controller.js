const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "7d" }
  );
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // demo (replace with prisma)
  const user = { id: 1, name, email };

  const token = createToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  res.json({ user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = { id: 1, email };

  const token = createToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  res.json({ user });
};

exports.googleLogin = async (req, res) => {
  const { email, name } = req.body;

  const user = { id: 1, email, name };

  const token = createToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  res.json({ user });
};
const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/jwt");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    
    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.json({ 
       success: true,
      message: "Register success",
       user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.json({ 
       success: true,
      message: "Login success",
       user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GOOGLE LOGIN 
exports.googleLogin = async (req, res) => {
  const { name, email, image } = req.body;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        email,
        avatar: image,
        password: "google",
      },
    });
  }

  res.json({ success: true, user });
};
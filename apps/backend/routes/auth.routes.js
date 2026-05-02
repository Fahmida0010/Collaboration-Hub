const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  register,
  login,
  googleLogin,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

const upload = multer({ dest: "uploads/" });

// register (keep ONE only)
router.post("/register", upload.single("avatar"), register);

// login
router.post("/login", login);

// google login
router.post("/google", googleLogin);

//  current user
router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
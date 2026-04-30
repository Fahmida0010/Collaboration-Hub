const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@test.com") {
    return res.json({ message: "Login success" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

app.listen(5000, () => console.log("Server running"));
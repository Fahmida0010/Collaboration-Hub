require("dotenv").config(); // 1. Sobar upore thakte hobe
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const workspace = require("./routes/workspace");
const goalRoutes = require("./routes/goal.routes"); // 2. Eita require kora silo na

const app = express();

// 3. Ekbar CORS use korai jothesto
console.log("CORS Origin:", process.env.CLIENT_URL);
app.use(cors({
  origin: process.env.CLIENT_URL ,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/workspace", workspace);
app.use("/auth", authRoutes);
app.use("/goals", goalRoutes); 

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
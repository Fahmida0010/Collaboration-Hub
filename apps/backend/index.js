const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


const workspaceRoutes = require("./routes/workspace.routes");

app.use("/workspace", workspaceRoutes);

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Backend running on 5000");
});
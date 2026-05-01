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

//   //workspace
// const workspaceRoutes = require("./routes/workspace.routes");
// app.use("/workspace", workspaceRoutes);

//  //goal & milestone
// const goalRoutes = require("./routes/goal.routes");
// app.use("/goal", goalRoutes);

 //auth
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running on port 5000🚀");
});

app.listen(5000, () => {
  console.log("Backend running on 5000");
});

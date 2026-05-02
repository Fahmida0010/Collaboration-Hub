const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth.routes");
//  const announcementRoutes = require("./routes/announcementRoutes");


const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const workspace = require("./routes/workspace");

//workspace
app.use("/workspace", workspace);



 //auth
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running on port 5000🚀");
});

app.listen(5000, () => {
  console.log("Backend running on 5000");
});

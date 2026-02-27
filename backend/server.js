const analysisRoutes = require("./routes/analysis");
const express = require("express");
const cors = require("cors");

const drugRoutes = require("./routes/drug");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/drug", drugRoutes);

app.use("/api/analysis", analysisRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
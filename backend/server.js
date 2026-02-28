const express = require("express");
const cors = require("cors");
const path = require("path");

const drugRoutes = require("./routes/drug");
const analysisRoutes = require("./routes/analysis");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/drug", drugRoutes);
app.use("/api/analysis", analysisRoutes);

// Serve React build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all handler for React (Express 5 safe)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
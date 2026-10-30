const express = require("express");
const cors = require("cors");
require("dotenv").config();

const generateRoute = require("./routes/generate");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "BrandVoice AI backend is running",
  });
});

app.use("/api/generate", generateRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

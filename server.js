const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const placeRoutes = require("./routes/placeRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/places", placeRoutes);
const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

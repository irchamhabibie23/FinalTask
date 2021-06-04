require("dotenv").config();
const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", apiRouter);
app.use("/public/uploads", express.static("./public/uploads"));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

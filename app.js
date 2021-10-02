const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cookieparser());
// Linking routor files
app.use(require("./routes/auth"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`Port Working at http://localhost:${PORT}`);
});

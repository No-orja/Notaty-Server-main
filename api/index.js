const express = require("express");
const serverless = require("serverless-http");
const app = express();

const routes = require("../src/routes");

app.use(express.json());

// ✅ Route تجريبي مباشر
app.get("/ping", (req, res) => {
  res.send("pong ✅");
});

// ⬇️ routes الأصلية
app.use("/api", routes);

module.exports = app;
module.exports.handler = serverless(app);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const router = require("./router/route");
app.use(bodyParser.json());
app.use("/crud", router); // Middleware
app.listen(port, () => {
  console.log(`Server listening on port no. ${port}`);
});

module.exports = app;

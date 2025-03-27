const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("REON Webhook is live and listening.");
});

app.get("/form", (req, res) => {
  const formPath = path.join(__dirname, "reon_contact_form.html");
  fs.readFile(formPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error loading form.");
    } else {
      res.send(data);
    }
  });
});

app.post("/webhook", (req, res) => {
  console.log("RECEIVED:", req.body);
  res.send({ status: "success", received: req.body });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});

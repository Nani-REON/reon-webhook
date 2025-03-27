
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// صفحه اصلی
app.get("/", (req, res) => {
  res.send("REON Webhook is live and listening.");
});

// مسیر نمایش فرم
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

// نقطه دریافت پیام از فرم
app.post("/webhook", (req, res) => {
  console.log("Received webhook:", req.body);
  res.send({ status: "received", data: req.body });
});

// اجرای سرور
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("REON webhook server is running on port", port);
});

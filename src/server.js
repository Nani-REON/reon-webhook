const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// نمایش پیام روی صفحه اصلی
app.get("/", (req, res) => {
  res.send("REON Webhook is live and listening.");
});

// نمایش فرم از مسیر درست
app.get("/form", (req, res) => {
  const formPath = path.join(__dirname, "reon_contact_form.html");
  res.sendFile(formPath);
});

// دریافت پیام از فرم
app.post("/webhook", (req, res) => {
  console.log("RECEIVED MESSAGE:", req.body);
  res.send({ status: "received", data: req.body });
});

// اجرا
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});

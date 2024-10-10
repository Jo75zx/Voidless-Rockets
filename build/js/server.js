const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Contact Form Server!");
});

app.post("/contact", (req, res) => {
  const { email, subject, message } = req.body;
  console.log(
    `Received data - Email: ${email}, Subject: ${subject}, Message: ${message}`
  );

  // Save data to a file in the 'src' directory
  const dataDir = path.join(__dirname, "src");
  const dataFilePath = path.join(dataDir, "contact_form_submissions.txt");

  // Ensure the 'src' directory exists
  if (!fs.existsSync(dataDir)) {
    console.log(`Creating directory: ${dataDir}`);
    fs.mkdirSync(dataDir);
  }

  const data = `Email: ${email}, Subject: ${subject}, Message: ${message}\n`;
  fs.appendFile(dataFilePath, data, (err) => {
    if (err) {
      console.error("Failed to save data", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(`Data saved to ${dataFilePath}`);
      res.send("Form submitted successfully!");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

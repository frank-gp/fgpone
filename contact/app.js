const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Serve the HTML file
app.get("/submit", (req, res) => {
  res.send("contact submit");
});

// Create a nodemailer transporter
// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'server251.web-hosting.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'contact@frankgp.com',
    pass: process.env.CONTACT_FRANKGP_COM,
  },
});

// Handle form submissions
app.post("/submit", async (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // Extract form data
  const { name, email, message, currentUrl } = formData;

  // Set up email data
  const mailOptions = {
    from: "contact@frankgp.com",
    to: "fgp555@gmail.com",
    cc: email,
    subject: "Thank you for writing to us",
    text: `Thank you for writing to us, we will respond soon \n\nName: ${name}\nFrom: ${email}\nMessage: ${message}\nSent from: ${currentUrl}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Log success and respond to the client
    console.log("Email sent successfully");
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    // Log the error and respond to the client
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Start the server
// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });

module.exports = app;

const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fgp555@gmail.com",
    pass: process.env.GMAIL_PASS_APP,
  },
});

// Define a route for sending emails
app.get("/submit_test", (req, res) => {
  // Set up email options
  const mailOptions = {
    from: "fgp555@gmail.com",
    to: "fgp555@gmail.com",
    subject: "Test Email",
    text: "This is a test email from Node.js!",
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

module.exports = app;

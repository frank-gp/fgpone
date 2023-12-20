const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors module
require('dotenv').config();

const router = express.Router();

// Enable CORS for all routes
// router.use(cors());
router.use(express.static(__dirname));

const apiUrl = 'https://graph.instagram.com/me/media';
const fields = 'media_url,permalink';
const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

if (!accessToken) {
  console.error('Instagram access token not found. Please check your .env file.');
  process.exit(1);
}

function fetchDataAndSave() {
  axios.get(apiUrl, {
    params: {
      fields,
      access_token: accessToken,
    },
  })
    .then(response => {
      const data = response.data;

      const filePath = path.join(__dirname, 'data.json');
      fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error('Error writing to data.json', err);
        } else {
          console.log('Data saved to data.json');
        }
      });
    })
    .catch(error => {
      console.error('Error fetching data from Instagram API', error.response ? error.response.data : error.message);
    });
}

router.get('/get-data', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

const interval = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
setInterval(fetchDataAndSave, interval);
fetchDataAndSave();

module.exports = { router };

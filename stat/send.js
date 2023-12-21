// Function to format date and time
function getCurrentDateTime() {
  return new Date().toLocaleString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

const local = "./received_data";
const remote = "https://fgp.one/stat/received_data";
// Function to send data to the server
function sendDataToServer(formData) {
  fetch(remote, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Data sent successfully!");
    })
    .catch((error) => {
      console.log("Error sending data:", error);
    });
}

// Function to fetch IP data and send it to the server
function fetchAndSendData() {
  let time = getCurrentDateTime();
  let currentURL = window.location.href;
  let referrerURL = document.referrer;

  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      const formData = {
        time,
        currentURL,
        referrerURL,
        ...data,
      };

      sendDataToServer(formData);
    })
    .catch((error) => {
      console.log("Error fetching IP data:", error);
    });
}

// Call the function to fetch and send data
fetchAndSendData();

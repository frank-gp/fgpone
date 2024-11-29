function statFn() {
  let time = new Date().toLocaleString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  var currentURL = window.location.href;
  var referrerURL = document.referrer;

  console.log(time);

  // Fetch data from https://ipapi.co/json/
  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((ipData) => {
      // Extract IP data
      const ip = ipData.ip;
      const city = ipData.city;
      const countryName = ipData.country_name;
      const timezone = ipData.timezone;
      const utcOffset = ipData.utc_offset;
      const countryCallingCode = ipData.country_calling_code;
      const currency = ipData.currency;
      const currencyName = ipData.currency_name;
      const languages = ipData.languages;
      const countryPopulation = ipData.country_population;
      const org = ipData.org;

      // Send data to the server
      fetch("/stat/received_data", {
      // fetch("https://fgp.one/stat/received_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          time: time,
          currentURL: currentURL,
          referrerURL: referrerURL,
          ip: ip,
          city: city,
          countryName: countryName,
          timezone: timezone,
          utcOffset: utcOffset,
          countryCallingCode: countryCallingCode,
          currency: currency,
          currencyName: currencyName,
          languages: languages,
          countryPopulation: countryPopulation,
          org: org
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Data sent successfully!');
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
    })
    .catch((error) => {
      console.error("Error fetching IP data:", error);
    });
}

statFn();

// Function to fetch Currency exchange rates
async function fetchExchangeRates() {
    const url = "https://open.er-api.com/v6/latest/USD";
    // The code fetches exchange rates from an API
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      // If the fetch succeeds, it parses the response as JSON, displays the exchange rates on the page, and updates the "Last updated" timestamp.
      const data = await response.json();
      displayRates(data.rates);
  
      // Update the "Last updated" time using the Unix timestamp from the API
      const lastUpdatedTimestamp = data.time_last_update_unix || data.time_last_updated;
      if (lastUpdatedTimestamp) {
          const lastUpdatedDate = new Date(lastUpdatedTimestamp * 1000); // Convert to milliseconds
          document.getElementById('last-updated').innerText = lastUpdatedDate.toLocaleString('en-US', { 
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
          });
      }
   //   If any errors occur (like network issues or failed API responses), the error is logged in the console and handled without crashing the application
  } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  // Function to display exchange rates
  function displayRates(rates) {
      const ratesDiv = document.getElementById('exchange-rates');
      ratesDiv.innerHTML = '<h3></h3>';
      const list = document.createElement('ul');
      for (const [currency, rate] of Object.entries(rates)) {
          const listItem = document.createElement('li');
          listItem.textContent = `${currency}: ${rate}`;
          list.appendChild(listItem);
      }
      ratesDiv.appendChild(list);
  }
  // Function to display exchange rates sorted from lowest to highest
  function displayRates(rates) {
    const ratesDiv = document.getElementById('exchange-rates');
    ratesDiv.innerHTML = '<h3>Exchange Rates (Sorted):</h3>';
  
    // Convert rates object into an array and sort by the rate (the value)
    const sortedRates = Object.entries(rates).sort((a, b) => a[1] - b[1]);
  
    const list = document.createElement('ul');
    
    // Iterate over sorted array and create list items
    for (const [currency, rate] of sortedRates) {
        const listItem = document.createElement('li');
        listItem.textContent = `${currency}: ${rate.toFixed(4)}`; // Rounded to 4 decimal places
        list.appendChild(listItem);
    }
  
    ratesDiv.appendChild(list);
  }
  
  // Fetch and display exchange rates initially
  fetchExchangeRates();
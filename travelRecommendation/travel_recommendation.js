// Function to fetch travel data from JSON file
async function fetchTravelData() {
    try {
      const response = await fetch('travel_recommendation_api.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  
  // Function to handle the search logic
  async function handleSearch() {
    const searchInput = document.getElementById('conditionInput').value.trim().toLowerCase();
    const data = await fetchTravelData();
  
    if (!data) {
      console.error('No data available');
      return;
    }
  
    let searchCategory = null;
  
    // Define keywords and their variations
    const keywords = {
      'beach': ['beach', 'beaches'],
      'temple': ['temple', 'temples'],
      'country': ['country', 'countries']
      // Add more keywords and variations as needed
    };
  
    // Determine the search category based on user input
    for (const key in keywords) {
      if (keywords[key].includes(searchInput)) {
        searchCategory = key;
        break;
      }
    }
  
    // Handle different search categories
    if (searchCategory === 'beach') {
      displayResults(data.beaches);
    } else if (searchCategory === 'temple') {
      displayResults(data.temples);
    } else if (searchCategory === 'country') {
      displayResults(data.countries);
    } else {
      alert('Please enter a valid search keyword: beach, temple, country');
      // Optionally, you can clear the search input or provide feedback to the user
    }
  }
  
  // Function to display search results
  function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
  
    if (!results || results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }
  
    let html = '<div class="results-list">';
  
    results.forEach(item => {
      html += `
        <div class="result-item">
          <h2>${item.name}</h2>
          <img src="${item.imageUrl}" alt="${item.name}">
          <p>${item.description}</p>
        </div>
      `;
    });
  
    html += '</div>';
    resultsContainer.innerHTML = html;
  }
  
  // Event listener for the search button
  document.getElementById('btnSearch').addEventListener('click', handleSearch);
  
// Function to clear the search input and results
function clearSearch() {
    // Clear the search input field
    document.getElementById('conditionInput').value = '';
  
    // Clear the search results container
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
  }
  
  // Event listener for a "Clear" button or link
  document.getElementById('btnClear').addEventListener('click', clearSearch);
  
  const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const newYorkTime = new Date().toLocaleTimeString('en-US', options);
  console.log("Current time in New York:", newYorkTime);
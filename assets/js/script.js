// ~~~~~~~~~~~~~~~~~~~~~ CODE USED FOR THE INDEX.HTML PAGE ~~~~~~~~~~~~~~~~~~~~~~~

// --------------------------- NASA APOD API CODE -------------------------------

// Variables used globally as needed
var APINasaKey = "BUbRCyc8uvOZ8RtdcBeAPgg8PSc8i953gclSIsdR";
var nasaCall = "https://api.nasa.gov/planetary/apod?api_key=" + APINasaKey + "&count=5";
var apodEl = document.querySelector('#apod');

// Function which dynamically generates elements to display based on NASA APOD API call
function displayApodImage(data) {

    // Lines 12-15: Used to dynamically generate HTML elements which display an image to the user based on API data
    var apodImg = data[0].hdurl;
    var imageEl = document.createElement('img');
    imageEl.src = apodImg;
    apodEl.appendChild(imageEl);

    // Lines 18-21: Used to dynamically generate HTML elements which display a title for the pulled image
    var imgTitle = data[0].title;
    var titleEl = document.createElement('h4');
    titleEl.textContent = imgTitle;
    apodEl.appendChild(titleEl);

    // Lines 24-27: Used to dynamically generate HTML elements which display a description of the pulled image
    var description = data[0].explanation;
    var descEl = document.createElement('p');
    descEl.textContent = description;
    apodEl.appendChild(descEl);
}

// The code used to 'fetch' data from the NASA APOD API based on the parameters supplied by the API documentation
fetch(nasaCall)
.then(function (response) {
    // If the fetch request is successful, it will move on to initialize the displayApodImage function written on lines 9-28
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayApodImage(data);
      });
    }
  });


// ------------------------------- OPENWEATHERMAP API CODE -------------------------------

// Variables used globally as needed
var apiKey = '761e346dafa7493bf1d4e34f98aecb7c';
var searchForm = document.querySelector('#search-form');
var modalInput = document.querySelector('#modal-input');
var currentWeather = document.querySelector('#current-weather');
var currentTemp = document.getElementById('currentTemp');
var currentVisibility = document.getElementById('currentVisibility');
var currentDescription = document.getElementById('currentDescription');
var currentClouds = document.getElementById('currentClouds');
var selectedIcon = document.getElementById('weatherIcon');

// Function to both run and display weather data based on the OPENWEATHERMAP API fetch request.
function getWeatherData(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  return fetch(apiUrl)
      // Lines 66-71: Confirms that the request is successful which allows the function to contiue, else gives the user an error message
      .then(response => {
      if (!response.ok) {
          throw new Error('Cannot retrieve data at this time.');
      }
      return response.json();
      })
      // Lines 73-81: Dynamically generates local weather info based on the user input city
      .then(data => {
        console.log(data); // Used primarily for testing and left in to allow easier changes to search paramaeters if needed in the future
        currentTemp.textContent = (data.list[0].main.temp) + "F";
        currentVisibility.textContent = (data.list[0].visibility) + "m of visibility";
        currentDescription.textContent = data.list[0].weather[0].description.toUpperCase();
        currentClouds.textContent = (data.list[0].clouds.all) + "% CLOUD COVER";
        var iconCode = data.list[0].weather[0].icon;
        var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
        selectedIcon.setAttribute('src', iconUrl);
      });
    };

  // Lines 86-95: Allows the user to input a city either through the initial pop-up modal, or choose a new city on the main page.
  // Either way, the user input will be run through the getWeatherData function to utilize the API
  function handleFormSubmit(event) {
    event.preventDefault();
    var city = modalInput.value.trim();
    if (city) {
        getWeatherData(city)
        
    }
    modalInput.value = '';
  }
    // Used to add clickability to the submit buttons, which then triggers the handleFormSubmit function
    searchForm.addEventListener('submit', handleFormSubmit);



// -------------------------------- INITIAL MODAL POP-UP ------------------------------------


// Lines 106-109: On page load, the modal is called to open
$(document).ready(function(){
  $('#pop-up').modal();
  $('#pop-up').modal('open'); 
});

// Lines 112-114: Allows the user to call back the modal if they want to search for a new city
$('#new-search').on('click', function(){
  $('#pop-up').modal('open'); 
});

// Lines 113-121: Saves the value of city to localStorage under the key 'city'
function handleFormSubmit(event) {
  event.preventDefault();
  var city = modalInput.value.trim();
  if (city) {
      getWeatherData(city);
      localStorage.setItem('city', city);
  }
  modalInput.value = '';
}

// Lines 124-127: Retrieve the saved city from localStorage and passes it to the getWeatherData function, which will use it to fetch weather data from the OpenWeatherMap API
var savedCity = localStorage.getItem('city');
if (savedCity) {
  getWeatherData(savedCity);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~ END OF CODE USED FOR THE INDEX.HTML PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

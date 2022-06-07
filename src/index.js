//------------------------------WK5: Search Engine for city------------------------
function getLocation(response) {
  let locationElement = document.querySelector("#location");
  let city = response.data.name;
  let country = response.data.sys.country;
  let location = `${city}, ${country}`;
  locationElement.innerHTML = `${location}`;
}

function getWeatherDescription(response) {
  let description = response.data.weather[0].description;
  let descriptionElem = document.querySelector(".weatherStatus");
  descriptionElem.innerHTML = `${description}`;
}

function getTemperature(response) {
  let temperatureElem = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElem.innerHTML = `${temperature}°C`;
}

function getFeelsLike(response) {
  let feelsLikeElem = document.querySelector("#feelsLike");
  let feelsLike = Math.round(response.data.main.feels_like);
  feelsLikeElem.innerHTML = `Feels like: ${feelsLike}°C`;
}

function getHumidity(response) {
  let humidityElem = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityElem.innerHTML = `Humidity 💧 ${humidity}%`;
}

function getWindSpeed(response) {
  let windSpeedElem = document.querySelector("#windSpeed");
  let mps = response.data.wind.speed;
  let windSpeed = Math.round(mps * (1000 / 3600)); //cover to km/h
  windSpeedElem.innerHTML = `Wind 💨${windSpeed} km/h`;
}

function getWeather(response) {
  getLocation(response);
  getWeatherDescription(response);
  getTemperature(response);
  getFeelsLike(response);
  getHumidity(response);
  getWindSpeed(response);
}

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let location = document.querySelector("#location");

  //Condition for blank entries
  let input = searchInput.value.trim();
  if (input) {
    location.innerHTML = `Searching location...`;
  } else {
    location.innerHTML = null;
    alert("Please enter a location.");
  }

  let city = searchInput.value;
  let units = "metric";
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  //Get weather data
  axios.get(`${apiUrl}`).then(getWeather);

  //Clear the search bar after submission
  document.getElementById("search-form").reset();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

//------------------Wk5 Bonus Feature - Current Location Button--------------------
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(getWeather);
}

function clickedCurrent() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationBttn = document.querySelector("#currentLocationBttn");
currentLocationBttn.addEventListener("click", clickedCurrent);

/*------------------------------------------------------------------------------
----------------------------------WK4 homework----------------------------------
---------------------------------------------------------------------------------*/
//Date format: Day, Month DD, YYYY
function getTodaysDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
}

//Time format: 12-hour period AM/PM
function getTimeNow(now) {
  let hour = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let meridiem = "";

  if (hour < 12) {
    meridiem = "AM";
  } else if (hour === 12) {
    meridiem = "PM";
  } else if (hour === 24) {
    hour = hour - 12;
    meridiem = "AM";
  } else {
    hour = hour - 12;
    meridiem = "PM";
  }
  return `${hour}:${minutes}${meridiem}`;
}

//Greeting format: Morning 12AM-11AM, Afternoon 12PM-5PM, Evening 6PM-11PM
function getGreeting(now) {
  let hour = now.getHours();
  let greeting = "";
  if (hour < 12) {
    greeting = "🌞Good Morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "😎Good Afternoon";
  } else if (hour > 17 && hour < 24) {
    greeting = "🌜Good Evening";
  } else {
    greeting = "🌞Good Morning";
  }
  return `${greeting}`;
}

let now = new Date();
let dateToday = document.querySelector("#date-today");
let timeNow = document.querySelector("#time-now");
let greeting = document.querySelector("#greeting");

dateToday.innerHTML = getTodaysDate(now);
timeNow.innerHTML = getTimeNow(now);
greeting.innerHTML = getGreeting(now);

/*Fahrenheit/Celsisu function
(17) in Celsius and add link to covert it to Fahrenheit. When clicking 
on it, it should covert the temperature to Fahrenheit. When clicking on 
Celsius, it should convert it back to Celsius
function getFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = "63";
}

function getCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = "17";
}
let fahrenheitBttn = document.querySelector("#fahrenheit-link");
let celsiusBttn = document.querySelector("#celsius-link");

//fahrenheitBttn.addEventListener("click", getFahrenheit);
//celsiusBttn.addEventListener("click", getCelsius);
*/

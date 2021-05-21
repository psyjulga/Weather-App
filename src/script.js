// Get current Weather & make City Output Font Smaller

function showCurrentWeather(response) {
  let receivedCity = response.data.name;
  let displayedCity = document.querySelector("h1");

  let newSize = new String(receivedCity);

  if (receivedCity.length > 6 && receivedCity.length < 9) {
    displayedCity.innerHTML = newSize.fontsize(6);
  } else {
    if (receivedCity.length >= 9) {
      displayedCity.innerHTML = newSize.fontsize(5);
    } else {
      displayedCity.innerHTML = receivedCity;
    }
  }

  let receivedTemp = Math.round(response.data.main.temp);
  let displayedTemp = document.querySelector("#temp");
  displayedTemp.innerHTML = receivedTemp;

  let receivedHumidity = Math.round(response.data.main.humidity);
  let displayedHumidity = document.querySelector("#humid");
  displayedHumidity.innerHTML = receivedHumidity;

  let receivedWindspeed = Math.round(response.data.wind.speed);
  let displayedWindspeed = document.querySelector("#wind");
  displayedWindspeed.innerHTML = receivedWindspeed;

  let receivedDescription = response.data.weather[0].description;
  let displayedDescription = document.querySelector("#description");
  displayedDescription.innerHTML = receivedDescription;
}

// via Current Location Button

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = `metric`;
  let weatherApiKey = `521e636942417dbc233358cdf12445eb`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=${unit}`;

  axios.get(weatherUrl).then(showCurrentWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#geolocation");
locationButton.addEventListener("click", getCurrentLocation);

// via Search City Form

function searchCity(city) {
  let weatherApiKey = `521e636942417dbc233358cdf12445eb`;
  let unit = `metric`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=${unit}`;

  axios.get(weatherUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Onload

searchCity("Berlin");

// Get current Time

function showCurrentTime(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[newDate.getDay()];

  let currentHour = newDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = newDate.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentDay} ${currentHour}:${currentMinute}`;
}

let time = document.querySelector("h3");
let currentTime = new Date();
time.innerHTML = showCurrentTime(currentTime);

// Convert between Fahrenheit and Celsius

function showFahrenheit(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temp");
  let fahrenheitTemp = celsiusTemp.innerHTML;
  celsiusTemp.innerHTML = Math.round((fahrenheitTemp * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temp");
  let celsiusTemp = fahrenheitTemp.innerHTML;
  fahrenheitTemp.innerHTML = Math.round(((celsiusTemp - 32) * 5) / 9);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

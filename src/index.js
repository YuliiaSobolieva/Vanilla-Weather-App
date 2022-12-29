let cityInput;
let currentCity;
let currentTemp;
let currentTime;
let currentWeekDay;
let cityValue = "";
let latitude;
let longitude;
let units = "metric";
let apiKey = "97f8e93f00107773f88eafd933ce86b7";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//1
window.addEventListener("DOMContentLoaded", load);

function load() {
  let search = document.querySelector("#search-form");
  let tempC = document.querySelector(".current-temp-C");
  let tempF = document.querySelector(".current-temp-F");
  let currentLocation = document.querySelector(".add-location");

  cityInput = document.querySelector(".search");
  currentCity = document.querySelector(".current-city");
  currentTemp = document.querySelector(".current-temp");

  search.addEventListener("submit", searchingCity);
  tempC.addEventListener("click", changeTempC);
  tempF.addEventListener("click", changeTempF);
  currentLocation.addEventListener("click", addLocation);

  getDate();
}

//when submit
function searchingCity(event) {
  event.preventDefault();
  cityValue = cityInput.value.toLowerCase();
  currentCity.innerHTML = cityValue;
  getCurrentTemp().then(setCurrentTemp);
}

//when click My location
function addLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getTempForMyLoc);
}

//when click
function changeTempC(event) {
  event.preventDefault();
  units = "metric";
  getForecast();
  getCurrentTemp().then(setCurrentTemp);
}

//when click
function changeTempF(event) {
  event.preventDefault();
  units = "imperial";
  getForecast();
  getCurrentTemp().then(setCurrentTemp);
}

function getDate() {
  let currentDate = new Date();
  let weekDay = days[currentDate.getDay()];
  currentWeekDay = document.querySelector(".current-day");
  currentWeekDay.innerHTML = weekDay;
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentTime = document.querySelector(".current-time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}

//after click or submit
function getCurrentTemp() {
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=${units}`;
  return axios.get(`${apiUrlSearch}&appid=${apiKey}`);

  getForecast();
}

//after getCurrentTemp
function setCurrentTemp(response) {
  const currentTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTemperature}`;

  let celsiusLabel = document.querySelector(".celsius");
  celsiusLabel.innerHTML = "°C";
  let slashLabel = document.querySelector(".addSlash");
  slashLabel.innerHTML = "/";
  let fahrenheitLabel = document.querySelector(".fahrenheit");
  fahrenheitLabel.innerHTML = "°F";

  let feelsLike = document.querySelector(".feelsLike");
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like: ${currentFeelsLike}°`;
  let humidity = document.querySelector(".humidity");
  let currenthumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${currenthumidity}%`;
  let wind = document.querySelector(".wind");
  let currentWind = response.data.wind.speed;
  wind.innerHTML = `Wind speed: ${currentWind}`;

  let iconElement = document.querySelector(".current-icon");
  let iconId = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );

  latitude = response.data.coord.lat;
  longitude = response.data.coord.lon;

  getForecast();
}

//after click
function getTempForMyLoc(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;
  getForecast();
  axios.get(`${apiUrl}&appid=${apiKey}`).then(setDataForLocation);
}

// after getTempForMyLoc
function setDataForLocation(response) {
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = temperature;

  let cityLoc = response.data.name;
  cityValue = cityLoc;
  currentCity.innerHTML = cityValue;

  let iconElement = document.querySelector(".current-icon");
  let iconId = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );

  let celsiusLabel = document.querySelector(".celsius");
  celsiusLabel.innerHTML = "°C";
  let slashLabel = document.querySelector(".addSlash");
  slashLabel.innerHTML = "/";
  let fahrenheitLabel = document.querySelector(".fahrenheit");
  fahrenheitLabel.innerHTML = "°F";

  let feelsLike = document.querySelector(".feelsLike");
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like: ${currentFeelsLike}°`;
  let humidity = document.querySelector(".humidity");
  let currenthumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${currenthumidity}%`;
  let wind = document.querySelector(".wind");
  let currentWind = response.data.wind.speed;
  wind.innerHTML = `Wind speed: ${currentWind}`;
}

function getForecast() {
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}`;

  axios.get(`${apiUrlForecast}&appid=${apiKey}`).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastData = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecastData.length = 5;

  forecastData.forEach(function (forecastDataDay) {
    let daylyMaxTemp = Math.round(forecastDataDay.temp.max);
    let daylyMinTemp = Math.round(forecastDataDay.temp.min);
    let date = new Date(forecastDataDay.dt * 1000);
    let day = date.getDay();
    let weekDay = days[day];
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
          <div class="forecast-week-day">${weekDay}</div>
          <div><img src="http://openweathermap.org/img/wn/${forecastDataDay.weather[0].icon}@2x.png" alt="" class="forecast-icon" /></div>
          <div class="forecast-temperature">
            <span class="forecast-max-temperature">${daylyMaxTemp}°</span>
            <span>-</span>
            <span class="forecast-min-temperature">${daylyMinTemp}°</span>
          </div>
      </div>
     `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let cityInput;
let currentCity;
let currentTemp;
let currentTime;
let currentWeekDay;
let cityValue = "";
let units = "metric";
let apiKey = "97f8e93f00107773f88eafd933ce86b7";

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

  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

//when submit
function searchingCity(event) {
  event.preventDefault();
  cityValue = cityInput.value.toLowerCase();
  currentCity.innerHTML = cityValue;
  getCurrentTemp().then(setCurrentTemp);
}

//when click
function addLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getTempForMyLoc);
}

//when click
function changeTempC(event) {
  event.preventDefault();
  units = "metric";

  getCurrentTemp().then(setCurrentTemp);
}

//when click
function changeTempF(event) {
  event.preventDefault();
  units = "imperial";
  getCurrentTemp().then(setCurrentTemp);
}

//after click or submit
function getCurrentTemp() {
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=${units}`;
  return axios.get(`${apiUrlSearch}&appid=${apiKey}`);
}

//after getCurrentTemp
function setCurrentTemp(response) {
  const currentTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTemperature}`;
  console.log(response.data);
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
}

//after click
function getTempForMyLoc(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;

  function setData(response) {
    let temperature = Math.round(response.data.main.temp);
    currentTemp.innerHTML = temperature;

    // console.log(response.data);

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
  axios.get(`${apiUrl}&appid=${apiKey}`).then(setData);
}

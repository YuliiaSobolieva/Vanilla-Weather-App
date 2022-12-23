// using search - submit (buttun Search or enter)
let cityInput;
let currentCity;
let currentTemp;
let cityValue = "";
// let cityLoc = "";
let units = "metric";
let apiKey = "97f8e93f00107773f88eafd933ce86b7";

window.addEventListener("DOMContentLoaded", load);

function load() {
  let search = document.querySelector("#search-form");
  let tempC = document.querySelector(".current-temp-C");
  let tempF = document.querySelector(".current-temp-F");
  let currentLocation = document.querySelector(".add-location");

  cityInput = document.querySelector(".search");
  currentCity = document.querySelector(".current-city");
  currentTemp = document.querySelector(".current-temp");
  // cityLoc = document.querySelector(".current-city");

  search.addEventListener("submit", searchingCity);
  tempC.addEventListener("click", changeTempC);
  tempF.addEventListener("click", changeTempF);
  currentLocation.addEventListener("click", addCity);
}

function getCurrentTemp() {
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=${units}`;
  return axios.get(`${apiUrlSearch}&appid=${apiKey}`);
}

function setCurrentTemp(response) {
  const currentTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTemperature}`;
  let time = response.data.dt;
  console.log(time);
}

function changeTempC(event) {
  event.preventDefault();
  units = "metric";
  getCurrentTemp().then(setCurrentTemp);
}

function changeTempF(event) {
  event.preventDefault();
  units = "imperial";
  getCurrentTemp().then(setCurrentTemp);
}

function searchingCity(event) {
  event.preventDefault();
  cityValue = cityInput.value.toLowerCase();
  currentCity.innerHTML = cityValue;
  getCurrentTemp().then(setCurrentTemp);
}

//using user location
function getTempForMyLoc(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;

  function setData(response) {
    let temperature = Math.round(response.data.main.temp);
    currentTemp.innerHTML = temperature;
    let cityLoc = response.data.name;
    console.log(cityLoc);
    cityValue = cityLoc;
    console.log(cityValue);
    currentCity.innerHTML = cityValue;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(setData);
}

function addCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getTempForMyLoc);
}

// week day and time - location
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
let currentWeekDay = document.querySelector(".current-day");
currentWeekDay.innerHTML = weekDay;
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${hours}:${minutes}`;

// // Farenheit and Celsius

// function changeTempC(event) {
//   event.preventDefault();
//   function getCurrentTempC(response) {
//     let currentTemperature = Math.round(response.data.main.temp);
//     console.log(currentTemperature);
//     let currentTemp = document.querySelector(".current-temp");
//     currentTemp.innerHTML = `${currentTemperature}`;
//   }
//   axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(getCurrentTempC);
// }
// let tempC = document.querySelector(".current-temp-C");
// tempC.addEventListener("click", changeTempC);

// function changeTempF(event) {
//   event.preventDefault();

//   let apiKeyF = "97f8e93f00107773f88eafd933ce86b7";
//   let apiUrlSearchF = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}units=imperial`;
//   function getCurrentTempF(response) {
//     let currentTemperature = Math.round(response.data.main.temp);
//     console.log(currentTemperature);
//     let currentTemp = document.querySelector(".current-temp");
//     currentTemp.innerHTML = `${currentTemperature}`;
//   }
//   axios.get(`${apiUrlSearchF}&appid=${apiKeyF}`).then(getCurrentTempF);
// }
// let tempF = document.querySelector(".current-temp-F");
// tempF.addEventListener("click", changeTempF);

// to do:
//1. F and C - DONE
//2. change the time if minutes<10
//3. week day and time for city that is not user location
//4. images
//5. forecast for next 5 days
//Capital letter of the city - done
//6. add current temp if button search is using - DONE
// new problem: use location, than search city and in F will use user's location info again

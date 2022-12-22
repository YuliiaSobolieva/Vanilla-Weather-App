// using search - submit (buttun enter)
function searchingCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search");
  let currentCity = document.querySelector(".current-city");

  currentCity.innerHTML = cityInput.value.toLowerCase();

  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;

  function getCurrentTemp(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    console.log(currentTemperature);
    let currentTemp = document.querySelector(".current-temp");
    currentTemp.innerHTML = `${currentTemperature}`;
  }
  axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(getCurrentTemp);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", searchingCity);

// using search click on the search button
function searchingCity2(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search");
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = cityInput.value.toLowerCase();

  let apiKey = "97f8e93f00107773f88eafd933ce86b7";
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  function getCurrentTemp2(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    console.log(currentTemperature);
    let currentTemp = document.querySelector(".current-temp");
    currentTemp.innerHTML = `${currentTemperature}`;
  }
  axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(getCurrentTemp);
}
let search2 = document.querySelector(".button");
search.addEventListener("click", searchingCity2);

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

// Farenheit and Celsius
//function changeTempC(event) {
//   event.preventDefault();
//   let currentTempC = document.querySelector(".current-temp");
//   currentTempC.innerHTML = 19;
// }
// let tempC = document.querySelector(".current-temp-C");
// tempC.addEventListener("click", changeTempC);

// function changeTempF(event) {
//   event.preventDefault();
//   let currentTempF = document.querySelector(".current-temp");
//   currentTempF.innerHTML = 66;
// }
// let tempF = document.querySelector(".current-temp-F");
// tempF.addEventListener("click", changeTempF);

//using user location
function addCity(event) {
  event.preventDefault();
  function myLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);

    let apiKey = "97f8e93f00107773f88eafd933ce86b7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

    function getWeather(response) {
      let temperature = Math.round(response.data.main.temp);
      console.log(temperature);
      let currentTemp = document.querySelector(".current-temp");
      currentTemp.innerHTML = `${temperature}`;
      let cityLoc = response.data.name;
      console.log(cityLoc);
      let currentLoc = document.querySelector(".current-city");
      currentLoc.innerHTML = `${cityLoc}`;
    }
    axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
  }
  navigator.geolocation.getCurrentPosition(myLocation);
}
let currentLocation = document.querySelector(".add-location");
currentLocation.addEventListener("click", addCity);

// to do:
//1. F and C
//2. change the time if minutes<10
//3. week day and time for city that is not user location
//4. images
//5. forecast for next 5 days
//Capital letter of the city - done

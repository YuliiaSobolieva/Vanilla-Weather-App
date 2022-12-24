let cityInput;
let currentCity;
let currentTemp;
let currentTime;
let currentWeekDay;
let cityValue = "";
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

  search.addEventListener("submit", searchingCity);
  tempC.addEventListener("click", changeTempC);
  tempF.addEventListener("click", changeTempF);
  currentLocation.addEventListener("click", addCity);

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

function getCurrentTemp() {
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=${units}`;
  return axios.get(`${apiUrlSearch}&appid=${apiKey}`);
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

function setCurrentTemp(response) {
  const currentTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTemperature}`;

  let celsiusLabel = document.querySelector(".celsius");
  celsiusLabel.innerHTML = "°C";
  let fahrenheitLabel = document.querySelector(".fahrenheit");
  fahrenheitLabel.innerHTML = "°F";

  let iconElement = document.querySelector(".current-icon");
  let iconId = response.data.weather[0].icon;
  console.log(iconId);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );

  // setDay(response.data.dt * 1000);
  // setTime(response.data.dt * 1000);

  function setTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    timeValue = `${hours}:${minutes}`;
    currentTime = document.querySelector(".current-time");
    currentTime.innerHTML = timeValue;
  }

  function setDay(timestamp) {
    let date = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let weekDay = days[date.getDay()];
    currentWeekDay = document.querySelector(".current-day");
    currentWeekDay.innerHTML = weekDay;
  }
}

//using user location
function getTempForMyLoc(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;

  function setData(response) {
    let temperature = Math.round(response.data.main.temp);
    currentTemp.innerHTML = temperature;

    let cityLoc = response.data.name;
    cityValue = cityLoc;
    currentCity.innerHTML = cityValue;

    let celsiusLabel = document.querySelector(".celsius");
    celsiusLabel.innerHTML = "°C";
    let slashLabel = document.querySelector(".addSlash");
    slashLabel.innerHTML = "/";
    let fahrenheitLabel = document.querySelector(".fahrenheit");
    fahrenheitLabel.innerHTML = "°F";

    let iconElement = document.querySelector(".current-icon");
    let iconId = response.data.weather[0].icon;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${iconId}@2x.png`
    );

    // setDay(response.data.dt * 1000);
    // setTime(response.data.dt * 1000);

    function setTime(timestamp) {
      let date = new Date(timestamp);
      let hours = date.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      timeValue = `${hours}:${minutes}`;
      currentTime = document.querySelector(".current-time");
      currentTime.innerHTML = timeValue;
    }

    function setDay(timestamp) {
      let date = new Date(timestamp);
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let weekDay = days[date.getDay()];
      currentWeekDay = document.querySelector(".current-day");
      currentWeekDay.innerHTML = weekDay;
    }
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(setData);
}

function addCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getTempForMyLoc);
}

// to do:
//1. F and C - DONE
//2. change the time if minutes<10 - Done
//3. week day and time for city that is not user location - only user location
//4. icon - DONE
//5. forecast for next 5 days - ???????
//Capital letter of the city - done
//6. add current temp if button search is using - DONE
// new problem: use location, than search city and in F will use user's location info again - DONE

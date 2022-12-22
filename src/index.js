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
  axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(getCurrentTemp2);
  //Celsius
  function changeTempC(event) {
    event.preventDefault();
    function getCurrentTempC(response) {
      let currentTemperature = Math.round(response.data.main.temp);
      console.log(currentTemperature);
      let currentTemp = document.querySelector(".current-temp");
      currentTemp.innerHTML = `${currentTemperature}`;
    }
    axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(getCurrentTempC);
  }
  let tempC = document.querySelector(".current-temp-C");
  tempC.addEventListener("click", changeTempC);
  //Farenheits
  function changeTempF(event) {
    event.preventDefault();

    let apiKeyF = "97f8e93f00107773f88eafd933ce86b7";
    let apiUrlSearchF = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial`;
    function getCurrentTempF(response) {
      let currentTemperature = Math.round(response.data.main.temp);
      console.log(currentTemperature);
      let currentTemp = document.querySelector(".current-temp");
      currentTemp.innerHTML = `${currentTemperature}`;
    }
    axios.get(`${apiUrlSearchF}&appid=${apiKeyF}`).then(getCurrentTempF);
  }
  let tempF = document.querySelector(".current-temp-F");
  tempF.addEventListener("click", changeTempF);
}
let searchButton = document.querySelector(".button");
searchButton.addEventListener("click", searchingCity2);

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

  //Celsius
  function changeTempC(event) {
    event.preventDefault();
    function getCurrentTempC(response) {
      let currentTemperature = Math.round(response.data.main.temp);
      console.log(currentTemperature);
      let currentTemp = document.querySelector(".current-temp");
      currentTemp.innerHTML = `${currentTemperature}`;
    }
    axios.get(`${apiUrlSearch}&appid=${apiKey}`).then(getCurrentTempC);
  }
  let tempC = document.querySelector(".current-temp-C");
  tempC.addEventListener("click", changeTempC);
  //Farenheits
  function changeTempF(event) {
    event.preventDefault();

    let apiKeyF = "97f8e93f00107773f88eafd933ce86b7";
    let apiUrlSearchF = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial`;
    function getCurrentTempF(response) {
      let currentTemperature = Math.round(response.data.main.temp);
      console.log(currentTemperature);
      let currentTemp = document.querySelector(".current-temp");
      currentTemp.innerHTML = `${currentTemperature}`;
    }
    axios.get(`${apiUrlSearchF}&appid=${apiKeyF}`).then(getCurrentTempF);
  }
  let tempF = document.querySelector(".current-temp-F");
  tempF.addEventListener("click", changeTempF);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", searchingCity);

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
    //Celsius
    function changeTempC(event) {
      event.preventDefault();
      function getCurrentTempC(response) {
        let temperature = Math.round(response.data.main.temp);
        console.log(temperature);
        let currentTemp = document.querySelector(".current-temp");
        currentTemp.innerHTML = `${temperature}`;
        let cityLoc = response.data.name;
        console.log(cityLoc);
        let currentLoc = document.querySelector(".current-city");
        currentLoc.innerHTML = `${cityLoc}`;
      }
      axios.get(`${apiUrl}&appid=${apiKey}`).then(getCurrentTempC);
    }
    let tempC = document.querySelector(".current-temp-C");
    tempC.addEventListener("click", changeTempC);
    //Farenheits
    function changeTempF(event) {
      event.preventDefault();

      let apiKeyF = "97f8e93f00107773f88eafd933ce86b7";
      let apiUrlF = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial`;
      function getCurrentTempF(response) {
        let temperature = Math.round(response.data.main.temp);
        console.log(temperature);
        let currentTemp = document.querySelector(".current-temp");
        currentTemp.innerHTML = `${temperature}`;
        let cityLoc = response.data.name;
        console.log(cityLoc);
        let currentLoc = document.querySelector(".current-city");
        currentLoc.innerHTML = `${cityLoc}`;
      }
      axios.get(`${apiUrlF}&appid=${apiKeyF}`).then(getCurrentTempF);
    }
    let tempF = document.querySelector(".current-temp-F");
    tempF.addEventListener("click", changeTempF);
  }
  navigator.geolocation.getCurrentPosition(myLocation);
}
let currentLocation = document.querySelector(".add-location");
currentLocation.addEventListener("click", addCity);

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

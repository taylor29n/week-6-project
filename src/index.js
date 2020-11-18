// Date & Time

let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekdays[now.getDay()];
let months = [
  "January",
  "February",
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
let month = months[now.getMonth()];

let currentDate = `${day} ${month} ${date}</br><strong>${hour}:${minutes}</strong>`;
document.querySelector("#date").innerHTML = currentDate;

// City Temperature

function displayTemp(response) {
  response.preventDefault();
  celciusVariable = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(celciusVariable);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
}

function searchCity(city) {
  city.preventDefault();
  let apiKey = "d84a8966c4d8473027b72c4eec67cecc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  searchCity(city.value);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitCity);

// Degrees Conversion

function displayFarenheit(event) {
  event.preventDefault();
  let degreesF = (celciusVariable * 9) / 5 + 32;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(degreesF);
  clickCelcius.classList.remove("active");
  clickFarenheit.classList.add("active");
}

function displayCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celciusVariable);
  clickCelcius.classList.add("active");
  clickFarenheit.classList.remove("active");
}

let clickFarenheit = document.querySelector("#farenheit");
clickFarenheit.addEventListener("click", displayFarenheit);

let clickCelcius = document.querySelector("#celcius");
clickCelcius.addEventListener("click", displayCelcius);

let celciusVariable = null;

// Current Location

function locationFinder(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = "d84a8966c4d8473027b72c4eec67cecc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&unit=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationFinder);
}

let currentButton = document.querySelector("#button-addon-current");
currentButton.addEventListener("click", findCurrentLocation);

// Extended Forecast

function extendedButton(event) {
  event.preventDefault();
  windowObjectReference = window.open("https://weather.com");
}
document.querySelector("#extended").addEventListener("click", extendedButton);

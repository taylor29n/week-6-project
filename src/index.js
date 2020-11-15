let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hours = `0${hour}`;
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

function displayTemp(response) {
  response.preventDefault();
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity() {
  let units = "metric";
  let apiKey = "d84a8966c4d8473027b72c4eec67cecc1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitCity);

function locationFinder(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let units = "metric";
  let apiKey = "d84a8966c4d8473027b72c4eec67cecc";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&unit=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationFinder);
}

let currentButton = document.querySelector("#button-addon-current");
currentButton.addEventListener("click", findCurrentLocation);

function extendedButton(event) {
  preventDefault(event);
  alert("Sorry, this function isn't available yet. Check Google!");
}

document.querySelector("#extended").addEventListener("click, extendedButton");

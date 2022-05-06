let currentTime = new Date();
let h3 = document.querySelector("h3");
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
h3.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  if (searchInput.value) {
    searchCity(searchInput.value);
  } else {
    alert("Please type a city");
  }
}

function searchCity(city) {
  console.log(city);

  let apiKey = "e187fb3f4af60991dba0543f601e6922";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "e187fb3f4af60991dba0543f601e6922";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", handleClick);

function showTemperature(response) {
  console.log(response);

  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;

  let temp = document.querySelector("#switch");
  temp.innerHTML = Math.round(response.data.main.temp);
}

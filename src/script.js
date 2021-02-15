let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let date = (now.getDate() < 10 ? '0' : '') + (now.getDate());
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
let hours = (now.getHours() < 10 ? '0' : '') + (now.getHours());
let minutes = (now.getMinutes() < 10 ? '0' : '') + (now.getMinutes());
document.querySelector("#today-content").innerHTML = `${day} ${date} ${month}, at ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault(); 
  let cityToSearch = document.querySelector("#city-input").value;
  let apiKey = "3c07c1c2ea0bcd61f5682ea2f874a164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTempAndCity);
};
function updateTempAndCity(response) { 
  document.querySelector("#city-to-update").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#felt-temperature").innerHTML = Math.round(response.data.main.feels_like);
  let iconToDisplay = response.data.weather[0].icon;
  let apiUrlIcon = `http://openweathermap.org/img/wn/${iconToDisplay}@2x.png`;
  document.querySelector("#weather-icon").src = apiUrlIcon;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description.replace(response.data.weather[0].description.charAt(0), response.data.weather[0].description.charAt(0).toUpperCase());
  document.querySelector("#windspeed").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
};
document.querySelector("#city-search").addEventListener("submit", searchCity);

function getCurrentPosition (event) {
  navigator.geolocation.getCurrentPosition(searchCurrentInfo);
}

function searchCurrentInfo(position) { 
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c07c1c2ea0bcd61f5682ea2f874a164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTempAndCity);
}
function displayTempAndCity (response) {
  document.querySelector("#city-to-update").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#felt-temperature").innerHTML = Math.round(response.data.main.feels_like);
  let iconToDisplay = response.data.weather[0].icon;
  let apiUrlIcon = `http://openweathermap.org/img/wn/${iconToDisplay}@2x.png`;
  document.querySelector("#weather-icon").src = apiUrlIcon;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description.replace(response.data.weather[0].description.charAt(0), response.data.weather[0].description.charAt(0).toUpperCase());
  document.querySelector("#windspeed").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}
document.querySelector("#here-now-weather").addEventListener("click", getCurrentPosition);

function convertTempAndUnit(event) {
  event.preventDefault();
  let tempToUpdate = document.querySelector("#current-temperature");
  let tempUnit = document.querySelector("#unit");
  let otherTempUnit = document.querySelector("#other-unit");
  let preciseFTemp = tempToUpdate.innerHTML * 1.8 + 32;
  let preciseCTemp = (tempToUpdate.innerHTML - 32) / 1.8;
  let feltTempToUpdate = document.querySelector("#felt-temperature");
  let preciseFFeltTemp = feltTempToUpdate.innerHTML * 1.8 + 32;
  let preciseCFeltTemp = (feltTempToUpdate.innerHTML - 32) / 1.8;
  if (tempUnit.innerHTML === "C") {
    tempToUpdate.innerHTML = Math.round(preciseFTemp);
    feltTempToUpdate.innerHTML = Math.round(preciseFFeltTemp);
  } else {
    tempToUpdate.innerHTML = Math.round(preciseCTemp);
    feltTempToUpdate.innerHTML = Math.round(preciseCFeltTemp);
  };

  tempUnit.innerHTML = otherTempUnit.innerHTML;
  if (tempUnit.innerHTML === "C") {
    otherTempUnit.innerHTML = "F";
  } else {
    otherTempUnit.innerHTML = "C";
  };
}
let unitChange = document.querySelector("#other-unit");
unitChange.addEventListener("click", convertTempAndUnit);

getCurrentPosition(null);
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let date = (now.getDate() < 10 ? '0' : '') + (now.getDate());
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
let hours = (now.getHours() < 10 ? '0' : '') + (now.getHours());
let minutes = (now.getMinutes() < 10 ? '0' : '') + (now.getMinutes());
document.querySelector("#today-content").innerHTML = `${day} ${date} ${month}, at ${hours}:${minutes}`;

function searchDefaultCity (city) {
let apiKey = "3c07c1c2ea0bcd61f5682ea2f874a164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTempAndCity);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let cityToSearch = document.querySelector("#city-input").value;
  let apiKey = "3c07c1c2ea0bcd61f5682ea2f874a164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTempAndCity);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
};
function updateTempAndCity(response) { 
  document.querySelector("#city-to-update").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#felt-temperature").innerHTML = Math.round(response.data.main.feels_like);
  let iconToDisplay = response.data.weather[0].icon;
  let apiUrlIcon = `http://openweathermap.org/img/wn/${iconToDisplay}@2x.png`;
  document.querySelector("#weather-icon").src = apiUrlIcon;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description.replace(response.data.weather[0].description.charAt(0), response.data.weather[0].description.charAt(0).toUpperCase());
  document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed*3.6);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
};
document.querySelector("#city-search").addEventListener("submit", searchCity);

function getCurrentPosition (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentInfo);
}

function searchCurrentInfo(position) { 
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c07c1c2ea0bcd61f5682ea2f874a164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTempAndCity);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTempAndCity (response) {
  document.querySelector("#city-to-update").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#felt-temperature").innerHTML = Math.round(response.data.main.feels_like);
  let iconToDisplay = response.data.weather[0].icon;
  let apiUrlIcon = `http://openweathermap.org/img/wn/${iconToDisplay}@2x.png`;
  document.querySelector("#weather-icon").src = apiUrlIcon;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description.replace(response.data.weather[0].description.charAt(0), response.data.weather[0].description.charAt(0).toUpperCase());
  document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed*3.6);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}
document.querySelector("#here-now-weather").addEventListener("click", getCurrentPosition);

function displayForecast (response) {
console.log(response.data);

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let dayPlus1 = days[new Date(response.data.list[7].dt_txt).getDay()];
let datePlus1 = (new Date(response.data.list[7].dt_txt).getDate() < 10 ? '0' : '') + (new Date(response.data.list[7].dt_txt).getDate());
let monthPlus1 = months[new Date(response.data.list[7].dt_txt).getMonth()];
let hoursPlus1 = (new Date(response.data.list[7].dt_txt).getHours() < 10 ? '0' : '') + (new Date(response.data.list[7].dt_txt).getHours());
let minutesPlus1 = (new Date(response.data.list[7].dt_txt).getMinutes() < 10 ? '0' : '') + (new Date(response.data.list[7].dt_txt).getMinutes());
document.querySelector("#today-plus-1").innerHTML = `${dayPlus1} ${datePlus1} ${monthPlus1}, ${hoursPlus1}:${minutesPlus1}`; 

let dayPlus2 = days[new Date(response.data.list[15].dt_txt).getDay()];
let datePlus2 = (new Date(response.data.list[15].dt_txt).getDate() < 10 ? '0' : '') + (new Date(response.data.list[15].dt_txt).getDate());
let monthPlus2 = months[new Date(response.data.list[15].dt_txt).getMonth()];
let hoursPlus2 = (new Date(response.data.list[15].dt_txt).getHours() < 10 ? '0' : '') + (new Date(response.data.list[15].dt_txt).getHours());
let minutesPlus2 = (new Date(response.data.list[15].dt_txt).getMinutes() < 10 ? '0' : '') + (new Date(response.data.list[15].dt_txt).getMinutes());
document.querySelector("#today-plus-2").innerHTML = `${dayPlus2} ${datePlus2} ${monthPlus2}, ${hoursPlus2}:${minutesPlus2}`;

let dayPlus3 = days[new Date(response.data.list[23].dt_txt).getDay()];
let datePlus3 = (new Date(response.data.list[23].dt_txt).getDate() < 10 ? '0' : '') + (new Date(response.data.list[23].dt_txt).getDate());
let monthPlus3 = months[new Date(response.data.list[23].dt_txt).getMonth()];
let hoursPlus3 = (new Date(response.data.list[23].dt_txt).getHours() < 10 ? '0' : '') + (new Date(response.data.list[23].dt_txt).getHours());
let minutesPlus3 = (new Date(response.data.list[23].dt_txt).getMinutes() < 10 ? '0' : '') + (new Date(response.data.list[23].dt_txt).getMinutes());
document.querySelector("#today-plus-3").innerHTML = `${dayPlus3} ${datePlus3} ${monthPlus3}, ${hoursPlus3}:${minutesPlus3}`;

let dayPlus4 = days[new Date(response.data.list[31].dt_txt).getDay()];
let datePlus4 = (new Date(response.data.list[31].dt_txt).getDate() < 10 ? '0' : '') + (new Date(response.data.list[31].dt_txt).getDate());
let monthPlus4 = months[new Date(response.data.list[31].dt_txt).getMonth()];
let hoursPlus4 = (new Date(response.data.list[31].dt_txt).getHours() < 10 ? '0' : '') + (new Date(response.data.list[31].dt_txt).getHours());
let minutesPlus4 = (new Date(response.data.list[31].dt_txt).getMinutes() < 10 ? '0' : '') + (new Date(response.data.list[31].dt_txt).getMinutes());
document.querySelector("#today-plus-4").innerHTML = `${dayPlus4} ${datePlus4} ${monthPlus4}, ${hoursPlus4}:${minutesPlus4}`;

document.querySelector("#icon-today-plus-1").src = `http://openweathermap.org/img/wn/${response.data.list[7].weather[0].icon}@2x.png`;
document.querySelector("#icon-today-plus-2").src = `http://openweathermap.org/img/wn/${response.data.list[15].weather[0].icon}@2x.png`;
document.querySelector("#icon-today-plus-3").src = `http://openweathermap.org/img/wn/${response.data.list[23].weather[0].icon}@2x.png`;
document.querySelector("#icon-today-plus-4").src = `http://openweathermap.org/img/wn/${response.data.list[31].weather[0].icon}@2x.png`;

document.querySelector("#temp-today-plus-1").innerHTML = Math.round(response.data.list[7].main.temp);
document.querySelector("#temp-today-plus-2").innerHTML = Math.round(response.data.list[15].main.temp);
document.querySelector("#temp-today-plus-3").innerHTML = Math.round(response.data.list[23].main.temp);
document.querySelector("#temp-today-plus-4").innerHTML = Math.round(response.data.list[31].main.temp);
}

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
  let dayPlus1Temp = document.querySelector("#temp-today-plus-1");
  let preciseFTempDayPlus1 = dayPlus1Temp.innerHTML * 1.8 + 32;
  let preciseCTempDayPlus1 = (dayPlus1Temp.innerHTML - 32) / 1.8;
  let dayPlus2Temp = document.querySelector("#temp-today-plus-2");
  let preciseFTempDayPlus2 = dayPlus2Temp.innerHTML * 1.8 + 32;
  let preciseCTempDayPlus2 = (dayPlus2Temp.innerHTML - 32) / 1.8;
  let dayPlus3Temp = document.querySelector("#temp-today-plus-3");
  let preciseFTempDayPlus3 = dayPlus3Temp.innerHTML * 1.8 + 32;
  let preciseCTempDayPlus3 = (dayPlus3Temp.innerHTML - 32) / 1.8;
  let dayPlus4Temp = document.querySelector("#temp-today-plus-4");
  let preciseFTempDayPlus4 = dayPlus4Temp.innerHTML * 1.8 + 32;
  let preciseCTempDayPlus4 = (dayPlus4Temp.innerHTML - 32) / 1.8;
  if (tempUnit.innerHTML === "C") {
    tempToUpdate.innerHTML = Math.round(preciseFTemp);
    feltTempToUpdate.innerHTML = Math.round(preciseFFeltTemp);
    dayPlus1Temp.innerHTML = Math.round(preciseFTempDayPlus1);
    dayPlus2Temp.innerHTML = Math.round(preciseFTempDayPlus2);
    dayPlus3Temp.innerHTML = Math.round(preciseFTempDayPlus3);
    dayPlus4Temp.innerHTML = Math.round(preciseFTempDayPlus4);
  } else {
    tempToUpdate.innerHTML = Math.round(preciseCTemp);
    feltTempToUpdate.innerHTML = Math.round(preciseCFeltTemp);
    dayPlus1Temp.innerHTML = Math.round(preciseCTempDayPlus1);
    dayPlus2Temp.innerHTML = Math.round(preciseCTempDayPlus2);
    dayPlus3Temp.innerHTML = Math.round(preciseCTempDayPlus3);
    dayPlus4Temp.innerHTML = Math.round(preciseCTempDayPlus4);
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
searchDefaultCity("Hawai");
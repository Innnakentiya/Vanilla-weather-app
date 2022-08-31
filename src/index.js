let now = new Date();
let date = now.getDate();
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = days[now.getDay()];
let months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
let month = months[now.getMonth()];
let dayDate = document.querySelector("#date");
dayDate.innerHTML = ` ${month} ${date}`;
let dayElement = document.querySelector("#day");
dayElement.innerHTML = ` ${day}`;

//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
                <div class="day" id="day">${formatDay(forecastDay.dt)}</div>
                <div class="date" id="date"></div>
                <img
                  class="weather-icon"
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="Weather Icon"
                  id="icon"
                  width="70"
                />
                <div
                  class="temperature-description"
                  id="temperature-description"
                >
                  Sunny
                </div>
                <div class="temperature" id="temperature-input">
                  <span class="min-temp"> ${Math.round(
                    forecastDay.temp.min
                  )}℃ /</span
                  ><span class="max-temp"> ${Math.round(
                    forecastDay.temp.max
                  )}℃ </span>
                </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
///

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1d69840c0c590c7b98248b4102610f33";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureInput = document.querySelector("#temperature-input");
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureMax = Math.round(response.data.main.temp_max);
  let cityElement = document.querySelector(".city");
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  temperatureInput.innerHTML = `${temperatureMin}℃/${temperatureMax}℃`;
  cityElement.innerHTML = response.data.name;
  temperatureDescription.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElementAPI = response.data.weather[0].icon;
  iconElement.setAttribute("alt", response.data.weather[0].description);
  if (iconElementAPI === "01d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/sun.svg`);
  } else if (iconElementAPI === "02d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/cloudy.svg`);
  } else if (iconElementAPI === "03d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/cloudy.svg`);
  } else if (iconElementAPI === "04d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/cloudy.svg`);
  } else if (iconElementAPI === "09d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/rain.svg`);
  } else if (iconElementAPI === "10d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/rain.svg`);
  } else if (iconElementAPI === "11d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/rain.svg`);
  } else if (iconElementAPI === "13d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/snow.svg`);
  } else if (iconElementAPI === "50d")
    document.querySelector("#icon").setAttribute("src", `src/icons/snow.svg`);
  if (iconElementAPI === "01d" || iconElementAPI === "01n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/sun.svg`);
  } else if (iconElementAPI === "02d" || iconElementAPI === "02n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/cloudy.svg`);
  } else if (iconElementAPI === "03d" || iconElementAPI === "03n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/cloudy.svg`);
  } else if (iconElementAPI === "04d" || iconElementAPI === "04n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/cloudy.svg`);
  } else if (iconElementAPI === "09d" || iconElementAPI === "09n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/rain.svg`);
  } else if (iconElementAPI === "10d" || iconElementAPI === "10n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/rain.svg`);
  } else if (iconElementAPI === "11d" || iconElementAPI === "11n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/rain.svg`);
  } else if (iconElementAPI === "13d" || iconElementAPI === "13n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/snow.svg`);
  } else if (iconElementAPI === "50d" || iconElementAPI === "50n") {
    document.querySelector("#icon").setAttribute("src", `src/icons/snow.svg`);
  }
  getForecast(response.data.coord);
}
//

function search(city) {
  let apiKey = "1d69840c0c590c7b98248b4102610f33";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Madrid");

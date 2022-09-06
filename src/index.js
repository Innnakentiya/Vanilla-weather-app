function formatForecastDate(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let forecastMonth = forecastDate.getMonth();
  let forecastMonthDay = forecastDate.getDate();
  let monthsForecast = [
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
  return `${monthsForecast[forecastMonth]} ${forecastMonthDay}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getIcon(iconElementAPI) {
  if (iconElementAPI === "01d") {
    return `src/icons/sun.svg`;
  } else if (iconElementAPI === "02d") {
    return `src/icons/cloudy.svg`;
  } else if (iconElementAPI === "03d") {
    return `src/icons/cloudy.svg`;
  } else if (iconElementAPI === "04d") {
    return `src/icons/cloudy.svg`;
  } else if (iconElementAPI === "09d") {
    return `src/icons/rain.svg`;
  } else if (iconElementAPI === "10d") {
    return `src/icons/rain.svg`;
  } else if (iconElementAPI === "11d") {
    return `src/icons/rain.svg`;
  } else if (iconElementAPI === "13d") {
    return `src/icons/snow.svg`;
  } else if (iconElementAPI === "50d") {
    return `src/icons/foggy.svg`;
  }
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
                <div class="day" id="day">${formatDay(forecastDay.dt)}</div>
                <div class="date" id="date">${formatForecastDate(
                  forecastDay.dt
                )}</div>
                <img
                  class="weather-icon"
                  src="${getIcon(forecastDay.weather[0].icon)}"
                  alt="Weather Icon"
                  id="icon"
                  width="70"
                />
                <div
                  class="temperature-description"
                  id="temperature-description"
                >
                  ${forecastDay.weather[0].main}
                </div>
                <div class="temperature" id="temperature-input">
                  <span class="min-temp"> ${Math.round(
                    forecastDay.temp.min
                  )}℃ /</span
                  ><span class="max-temp"> ${Math.round(
                    forecastDay.temp.max
                  )}℃ </span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
  temperatureInput.innerHTML = `${temperatureMin}℃/${temperatureMax}℃`;
  cityElement.innerHTML = response.data.name;
  temperatureDescription.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElementAPI = response.data.weather[0].icon;
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute("src", getIcon(iconElementAPI));
  getForecast(response.data.coord);
}

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

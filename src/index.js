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
  temperatureInput.innerHTML = `${temperatureMin}℃/${temperatureMax}℃`;
  cityElement.innerHTML = response.data.name;
  temperatureDescription.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "1d69840c0c590c7b98248b4102610f33";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lviv&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

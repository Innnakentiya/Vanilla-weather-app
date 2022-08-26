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
  } else if (iconElement === "13d") {
    document.querySelector("#icon").setAttribute("src", `src/icons/snow.svg`);
  } else if (iconElementAPI === "50d")
    document.querySelector("#icon").setAttribute("src", `src/icons/snow.svg`);
}

let apiKey = "1d69840c0c590c7b98248b4102610f33";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lviv&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

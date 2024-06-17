const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const alertMsg = document.querySelector(".alert");
const loader = document.querySelector(".loader-div");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// Function Fetch API
apiData("cairo");
async function apiData(city) {
  try {
    loader.classList.remove("d-none");
    const weatherData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4dbcd10e8c014e6aa6b132508241206&q=${city}&days=3`
    );
    finalWeatherData = await weatherData.json();
    loader.classList.add("d-none");
    displayData(weatherData);
    alertMsg.classList.add("d-none");
  } catch (error) {
    const weatherData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4dbcd10e8c014e6aa6b132508241206&q=cairo&days=3`
    );
    finalWeatherData = await weatherData.json();
    displayData(weatherData);
    alertMsg.classList.remove("d-none");
    if (searchInput.value == "") {
      alertMsg.classList.add("d-none");
    }
  }
}
// Show Data in HTML

function displayData(api) {
  var box = "";
  for (let i = 0; i < finalWeatherData.forecast.forecastday.length; i++) {
    let date = new Date(finalWeatherData.forecast.forecastday[i].date);
    if (i == 0) {
      box += `<div class="item col-lg-4">
          <div class="inner day rounded-2 p-4">
              <div class="date d-flex justify-content-between align-items-center">
                  <p>${days[date.getDay()]}</p>
                  <p>${finalWeatherData.forecast.forecastday[i].date}</p>
              </div>
              <div class="weather-info p-3">
                  <span class="city text-light">${
                    finalWeatherData.location.name
                  }</span>
                               <div class="temp d-flex  flex-column">
  <h1 class="">${Math.floor(finalWeatherData.current.temp_c)} <sup>o</sup>C</h1>
    <p class="">${Math.floor(
      finalWeatherData.forecast.forecastday[i].day.mintemp_c
    )} <sup>o</sup>C</p>
</div>
                  <img src="https:${
                    finalWeatherData.current.condition.icon
                  }" alt="">
                  <span class="weather-now">${
                    finalWeatherData.current.condition.text
                  }</span>
              </div>
              <div class="more-info d-flex justify-content-around align-items-center text-light">
                  <span><span><i class="fa-solid fa-umbrella text-white"></i> </span>${
                    finalWeatherData.forecast.forecastday[0].day
                      .daily_chance_of_rain
                  } %</span>
                  <span><span><i class="fa-solid fa-wind"></i></span> ${
                    finalWeatherData.current.wind_kph
                  } Km/h</span>
              </div>
          </div>
      </div>
      `;
    } else {
      box += `<div class="item col-lg-4">
          <div class="inner day rounded-2 p-4">
              <div class="date d-flex justify-content-between align-items-center">
                  <p>${days[date.getDay()]}</p>
                  <p>${finalWeatherData.forecast.forecastday[i].date}</p>
              </div>
              <div class="weather-info p-3">
                  <span class="city text-light">${
                    finalWeatherData.location.name
                  }</span>
                  <div class="temp d-flex  flex-column">
  <h1 class="">${Math.floor(
    finalWeatherData.forecast.forecastday[i].day.maxtemp_c
  )} <sup>o</sup>C</h1>

    <p class="">${Math.floor(
      finalWeatherData.forecast.forecastday[i].day.mintemp_c
    )} <sup>o</sup>C</p>
</div>
                  <img src="https:${
                    finalWeatherData.forecast.forecastday[i].day.condition.icon
                  }" alt="">
                  <span class="weather-now">${
                    finalWeatherData.forecast.forecastday[i].day.condition.text
                  }</span>
              </div>
              <div class="more-info d-flex justify-content-around align-items-center text-light">
                  <span><span><i class="fa-solid fa-umbrella text-white"></i> </span>${
                    finalWeatherData.forecast.forecastday[i].day
                      .daily_chance_of_rain
                  } %</span>
                  <span><span><i class="fa-solid fa-wind"></i></span> ${
                    finalWeatherData.forecast.forecastday[i].day.avgvis_km
                  } Km/h</span>
              </div>
          </div>
      </div>
      `;
    }
    console.log(finalWeatherData.forecast.forecastday[0].day.mintemp_c);
  }
  document.getElementById("rowData").innerHTML = box;
}

// To Search

searchBtn.addEventListener("click", function () {
  const term = searchInput.value;
  apiData(term);
  searchInput.value = null; // Clear Search
});

searchInput.addEventListener("input", function () {
  const term = searchInput.value;
  apiData(term);
});

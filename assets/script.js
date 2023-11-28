var searchForm = document.getElementById('search-form');
var cityInput = document.getElementById('city-input');
var currentWeatherSection = document.getElementById('current-weather');
var forecastSection = document.getElementById('forecast');
var searchHistorySection = document.getElementById('search-history');
var apiKey = '2887eb657d645e8a5e00a5cf6872ea47'; 

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var cityName = cityInput.value.trim();

    if (cityName !== '') {
        searchCity(cityName);
        cityInput.value = ''; 
    }
});

function searchCity(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateCurrentWeather(data);
            updateForecast(data);
            addToSearchHistory(city);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function updateCurrentWeather(data) {
    var currentWeather = data.list[0];
    var cityName = data.city.name;
    var icon = currentWeather.weather[0].icon;
    var temperature = currentWeather.main.temp;
    var humidity = currentWeather.main.humidity;
    var windSpeed = currentWeather.wind.speed;

    currentWeatherSection.innerHTML = `
        <h2>${cityName}</h2>
        <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} &#8457;</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} mph</p>
    `;
}

function updateForecast(data) {
    var forecastList = data.list;

    var forecastHTML = '';

    for (var i = 0; i < forecastList.length; i += 8) {
        var forecast = forecastList[i];
        var date = new Date(forecast.dt * 1000);
        var icon = forecast.weather[0].icon;
        var temperature = forecast.main.temp;
        var humidity = forecast.main.humidity;
        var windSpeed = forecast.wind.speed;

        forecastHTML += `
            <div class="forecast-item">
                <p class="forecast-date">${getFormattedDate(date)}</p>
                <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
                <p>Temperature: ${temperature} &#8457;</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} mph</p>
            </div>
        `;
    }

    
    forecastSection.innerHTML = forecastHTML;
}

function getFormattedDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return month + '/' + day + '/' + year;
}
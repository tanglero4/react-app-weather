import React, { useState } from "react";
import axios from "axios";
import './WeatherSearch.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function WeatherSearch() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "9ea02d04e1b4b40cf8fbc6da7f94247b";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  function displayWeather(response) {
    setSubmitted(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  let form = (
    <form onSubmit={handleSubmit} >
      <input
        type="search"
        onChange={updateCity}
        placeholder="Enter a city.."
        autoFocus="on"
        className="searchText"
      />
      <input className="searchButton" type="submit" value="Search" />
    </form>
  );


  if (submitted) {
    return (
      <div className="main">
        <div className="weatherBackground">
        <h1>Weather App 🌡</h1>
        {form}
        <ul>
          <li>Temperature: {weather.temperature}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} Km/h</li>
          <li>
            {" "}
            <img src={weather.icon} alt="Weather icon"/>
          </li>
        </ul>
      </div>
      </div>
    );
  } else {
    return (
      <div className="main">
      <div className="weatherBackground">
          <div class="row">
              <div class="col-6">
                  <h1>🌡25°C</h1>
              </div>
              <div class="col-6">
              {form}
              </div>
          </div>
          <div class="container">
    <div class="row">
        <div class="col">
<h1>Today</h1>
<h2>Sunday 16:50</h2>
</div>
<div class="col">
            <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="Weather icon"/>
</div>
<div class="col">
        <ul>
          <li>Description: Clear Sky</li>
          <li>Humidity: 15 %</li>
          <li>Wind: 2 Km/h</li>
          
        </ul>
        </div>
        </div>
        </div>
        <div className="Forecast">
        <div class="container">
        <div class="row">
        <div class="col-2">
        <div >Monday</div>
        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="Weather icon"/>
            <div class="weather-forcast-temperature">
              <span class="weather-forecast-max">20° C </span>|
              <span class="weather-forecast-min">18° C</span>
            </div>
    </div>
    <div class="col-2">
        <div >Tuesday</div>
        <img src="http://openweathermap.org/img/wn/09n@2x.png" alt="Weather icon"/>
            <div class="weather-forcast-temperature">
              <span class="weather-forecast-max">17° C </span>|
              <span class="weather-forecast-min">15° C</span>
            </div>
    </div>
    <div class="col-2">
        <div >Wednesday</div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="Weather icon"/>
            <div class="weather-forcast-temperature">
              <span class="weather-forecast-max">22° C </span>|
              <span class="weather-forecast-min">17° C</span>
            </div>
    </div>
    <div class="col-2">
        <div >Thursday</div>
        <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="Weather icon"/>
            <div class="weather-forcast-temperature">
              <span class="weather-forecast-max">21° C </span>|
              <span class="weather-forecast-min">19° C</span>
            </div>
    </div>


    </div>
</div>
</div>
      </div>
      </div>

    );
  } 
}
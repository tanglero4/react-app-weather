import React, { useState } from "react";
import axios from "axios";
import './WeatherSearch.css';

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
      <h1>Weather App 🌡</h1>
        {form}
        <ul>
          <li>Temperature: 25°C</li>
          <li>Description: Clear Sky</li>
          <li>Humidity: 15 %</li>
          <li>Wind: 2 Km/h</li>
          <li>
            {" "}
            <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="Weather icon"/>
          </li>
        </ul>
      </div>
      </div>
    )
  }
}
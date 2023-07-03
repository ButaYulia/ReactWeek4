import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState("");

  function displayWeather(response) {
    console.log(response);
    setForecast(
      <ol>
        <li>🌡️ Temperature: {Math.round(response.data.main.temp)}°C</li>
        <li>📙 Description: {response.data.weather[0].description}</li>
        <li>💧 Humidity: {response.data.main.humidity}%</li>
        <li>🌬️ Wind: {Math.round(response.data.wind.speed)}km/h</li>
        <li>
          <img
            src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            alt={response.data.weather[0].description}
          />
        </li>
      </ol>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=894a2e7aa7f46eeca5d8778f6faa5a5b&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="App">
      <div className="CitySearch">
        <div className="square-main">
          <div className="square-first">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="Enter a city"
                onChange={updateCity}
              />
              <input type="submit" value="search" />
            </form>
            <img src="https://media.tenor.com/lUIQnRFbpscAAAAi/loading.gif" />
            {forecast}
          </div>
          <div className="square-second">
            <h1>Weather Search Engine</h1>
            <p>
              Created by
              <a href="https://github.com/ButaYulia/ReactWeek4"> Buta Yuliia</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

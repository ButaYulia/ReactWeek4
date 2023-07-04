import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState("");
  const [loader, setLoader] = useState(true);

  function displayWeather(response) {
    console.log(response);
    setLoader(false);
    setForecast(
      <ol>
        <li>
          ⏰ Time & Date:
          {` ${new Date().getDay()}/7 of a Week, ${new Date().getHours()}:${new Date().getMinutes()}`}
        </li>
        <li>🏙️ City: {response.data.name} </li>
        <li>🌡️ Temperature: {Math.round(response.data.main.temp)}°C</li>
        <li className="weather">
          <span>📙 Description: {response.data.weather[0].description} </span>
          <img
            src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            alt={response.data.weather[0].description}
          />
        </li>
        <li>💧 Humidity: {response.data.main.humidity}%</li>
        <li>🌬️ Wind: {Math.round(response.data.wind.speed)}km/h</li>
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
  function useLoader() {
    if (loader === true) {
      return (
        <img src="https://media.tenor.com/nWnUEov7yIoAAAAC/crying-cat.gif" />
      );
    }
  }
  return (
    <div className="App">
      <div className="CitySearch">
        <div className="square-main">
          <div className="square-first">
            <h1>In which city you wanna know weather?</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="Enter a city"
                onChange={updateCity}
              />
              <input type="submit" value="search" />
            </form>
            {useLoader()}
            {forecast}
          </div>
          <div className="square-second">
            <h1>Weather Search Engine</h1>
            <img
              src="https://media.tenor.com/RVvnVPK-6dcAAAAC/reload-cat.gif"
              style={{ widht: "300px", height: "300px" }}
            />
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

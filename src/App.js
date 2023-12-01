import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherIcon from './component/WeatherIcon';
import './App.css';

const kelvinToCelsius = (kelvin) => kelvin - 273.15;

const App = () => {
  const [city, setCity] = useState('Toronto');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3c193467b7ad56422d31cccb0aacf2b8`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  const getDayOfWeek = (dateString) => {
    const options = { weekday: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="app-container">
      <h1 className="title">Weather Forecast</h1>
      <div className="weather-container">
        {weatherData && weatherData.list && weatherData.list.length > 0 && (
          <>
            <div className="left-container">
              <div className="current-day">
                {getDayOfWeek(weatherData.list[0].dt * 1000)}
              </div>
              <div className="current-date">
                {new Date(weatherData.list[0].dt * 1000).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="location">
                <WeatherIcon code={weatherData.list[0].weather[0].icon} />
                <span>{weatherData.city.name}</span>
              </div>
              <div className="temperature">
                {Math.round(kelvinToCelsius(weatherData.list[0].main.temp))}°C
              </div>
              <div className="condition">{weatherData.list[0].weather[0].description}</div>
            </div>
            <div className="right-container">
              <div className="high-low">
                High: {Math.round(kelvinToCelsius(weatherData.list[0].main.temp_max))}°C / Low:{' '}
                {Math.round(kelvinToCelsius(weatherData.list[0].main.temp_min))}°C
              </div>
              <div className="extra-info">
                Air Pressure: {weatherData.list[0].main.pressure} hPa<br />
                Wind Speed: {weatherData.list[0].wind.speed} m/s<br />
                Humidity: {weatherData.list[0].main.humidity}%<br />
                Predictability: {weatherData.list[0].clouds.all}%
              </div>
            </div>
          </>
        )}
      </div>
      {weatherData && weatherData.list && weatherData.list.length > 0 && (
        <div className="forecast-container">
          <h2>5-Day Weather Forecast</h2>
          <div className="forecast-list">
            {/* Loop through the next 5 days and display weather forecast */}
            {weatherData.list.slice(1, 6).map((day) => (
              <div key={day.dt}>
                <WeatherIcon code={day.weather[0].icon} />
                <div className="day">{getDayOfWeek(day.dt * 1000)}</div>
                <div className="temperature">{Math.round(kelvinToCelsius(day.main.temp))}°C</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={() => setCity(city)}>Search</button>
      </div>
    </div>
  );
};

export default App;

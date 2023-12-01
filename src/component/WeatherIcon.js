import React from 'react';

const WeatherIcon = ({ code }) => {
  const baseURL = 'https://openweathermap.org/img/wn/';
  const iconURL = `${baseURL}${code}@2x.png`;

  return <img src={iconURL} alt="Weather Icon" />;
};

export default WeatherIcon;

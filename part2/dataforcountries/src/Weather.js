import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({country}) => {

  const [lat, lon] = country.capitalInfo.latlng;
  const [weather, setWeather] = useState()

  const kelvinToCelsius = () => {
    const far = weather.main.temp;
    return (far-273.15).toFixed(2)
  }

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(resp => {
        setWeather(resp.data)
      })
  }, [lat, lon])

  if(weather){
    return (
      <>
        <h1>Wheather in {country.capital[0]}</h1>
        <h4>Temperature: {kelvinToCelsius()}</h4>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon"/>
        <h4>Wind: {weather.wind.speed} m/s</h4>
      </>
    );
  }else{
    return null
  }

}
export default Weather;
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import '../css/weather.css'
import { Spinner } from 'react-bootstrap'

import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState("")


  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "default": clear_icon,
  }

  const fetchData = async (userInput) => {

    if (userInput === '') {
      alert('Please enter a city name');
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || allIcons["default"]

      setWeatherData({
        humidity: data.main.humidity,
        temperature: data.main.temp,
        wind: data.wind.speed,
        icon: icon,
        cityName: data.name,
        country: data.sys.country
      })

    } catch (error) {
      console.log("Error fetching weather data:", error);
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
    fetchData('lagos')
  }, [])

  // useEffect(() => {
  //   console.log('Here is the filtered weather data', weatherData);
  // }, [weatherData])

  return (
    <div className='weather'>

      <div className='search-bar'>

        <input ref={inputRef} type="text" placeholder='Search City...' />

        <img onClick={() => fetchData(inputRef.current.value)} src={search_icon} alt="" />

      </div>

      {weatherData ?
        <>
          <div className='weather-info'>

            <div className='weather-image'>
              <img src={weatherData.icon} alt="" className='weather-icon' />
            </div>

            <div className='temp-location'>
              <p className='temperature'>{weatherData.temperature}<sup>o</sup>C</p>
              <p className='location'>{weatherData.cityName}, {weatherData.country}</p>
            </div>

            <div className='weather-data'>
              <div className='col'>
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>


              <div className='col'>
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.wind} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>


            </div>


          </div>
        </>
        :
        <div className='spinner-container'>
          {/* <Spinner animation="grow" variant="primary" /> */}

          <div className='spinner-mid-container'>
            <Spinner className='spinner' animation="border" variant="primary" />

            <p className='blinking-text'>Please wait...</p>
          </div>
          
        </div>}




    </div>
  )
}

export default Weather
"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  main: {
    temp: number
    humidity: number
  }
  weather: Array<{
    description: string
  }>
  name: string

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  // Mapping of weather conditions to custom icon filenames
  const iconMapping = {
    Clouds: 'clouds.png',
    Drizzle: 'drizzle.png',
    Mist: 'mist.png',
    Rain: 'rain.png',
    Snow: 'snow.png',
    Wind: 'wind.png',
  };

  // Mapping for Pressure, Humidity, and Wind icons
  const statIconMapping = {
    Pressure: 'pressure.png',
    Humidity: 'humidity.png',
    Wind: 'wind.png',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<WeatherData>('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: 'Kathmandu',
            appid: 'ae4ca9856c92c4ede63a36c109a16c24',
            units: 'metric',
          },
        })
        console.log('Fetched data:', response.data)
        setWeatherData(response.data)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching the weather data:', error.message)
        } else {
          console.error('An unknown error occurred while fetching weather data')
        }
      }
    }

    fetchData()
  }, [])

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  // Ensure weatherData has the necessary structure
  const weatherCondition = weatherData.weather?.[0]?.main || 'default';
  const iconFilename = iconMapping[weatherCondition] || 'default.png';
  const iconUrl = `https://raw.githubusercontent.com/Adarsha-Pantha/weather-icon/main/images/${iconFilename}`;

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="flex items-center justify-center bg-cover bg-center rounded-3xl"
        style={{
          backgroundImage: `url('/light1.png')`,
          width: '340px', // Adjusted width
          height: '360px', // Increased height
        }}
      >
        <div className="bg-gray-800 bg-opacity-30 rounded-3xl p-4 shadow-lg backdrop-blur-sm" style={{ width: '160px', height: '340px' }}>
          <div className="text-center text-white">
            <h2 className="text-[14px]">{weatherData.name}</h2>
            <p className="text-[8px]">{new Date().toLocaleString()}</p>
            <div className="flex justify-center my-2">
              <img src={iconUrl} alt="Weather Icon" className="w-20 h-20" /> {/* Weather icon */}
            </div>
            <p className="capitalize text-[10px]">{weatherData.weather?.[0]?.description || 'N/A'}</p> {/* "Few Clouds" above temperature */}
            <h1 className="text-[32px] mt-2">{Math.round(weatherData.main?.temp || 0)}°C</h1> {/* Temperature */}
          </div>
          <div className="flex justify-between text-white mt-8 text-[8px]"> {/* Added margin-top */}
            <div className="flex flex-col items-center gap-1">
              <img src={`https://raw.githubusercontent.com/Adarsha-Pantha/weather-icon/main/images/${statIconMapping.Pressure}`} alt="Pressure Icon" className="w-6 h-6" /> {/* Bigger icon */}
              <p>Pressure</p>
              <p>{weatherData.main?.pressure || 'N/A'} hPa</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src={`https://raw.githubusercontent.com/Adarsha-Pantha/weather-icon/main/images/${statIconMapping.Humidity}`} alt="Humidity Icon" className="w-6 h-6" /> {/* Bigger icon */}
              <p>Humidity</p>
              <p>{weatherData.main?.humidity || 'N/A'}%</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src={`https://raw.githubusercontent.com/Adarsha-Pantha/weather-icon/main/images/${statIconMapping.Wind}`} alt="Wind Icon" className="w-6 h-6" /> {/* Bigger icon */}
              <p>Wind</p>
              <p>{weatherData.wind?.speed || 'N/A'} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

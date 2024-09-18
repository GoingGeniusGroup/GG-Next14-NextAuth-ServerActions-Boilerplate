"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'

interface WeatherData {
  name: string
  weather: Array<{ main: string; description: string }>
  main: {
    temp: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
  }
}

interface IconMapping {
  [key: string]: string
}

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  const iconMapping: IconMapping = {
    Clouds: 'clouds.png',
    Drizzle: 'drizzle.png',
    Mist: 'mist.png',
    Rain: 'rain.png',
    Snow: 'snow.png',
    Wind: 'wind.png',
  }

  const statIconMapping: IconMapping = {
    Pressure: 'pressure.png',
    Humidity: 'humidity.png',
    Wind: 'wind.png',
  }

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
    return <p>Loading...</p>
  }

  const getWeatherIcon = (condition: string): string => {
    return `https://raw.githubusercontent.com/Adarsha-Pantha/weather-icon/main/images/${iconMapping[condition] || 'default.png'}`
  }

  const getStatIcon = (stat: keyof typeof statIconMapping): string => {
    return `https://raw.githubusercontent.com/Adarsha-Pantha/weather-icon/main/images/${statIconMapping[stat]}`
  }

  const weatherCondition = weatherData.weather[0]?.main || 'default'
  const iconUrl = getWeatherIcon(weatherCondition)

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="flex items-center justify-center bg-cover bg-center rounded-3xl"
        style={{
          backgroundImage: `url('/light1.png')`,
          width: '340px',
          height: '360px',
        }}
      >
        <div className="bg-gray-800 bg-opacity-30 rounded-3xl p-4 shadow-lg backdrop-blur-sm" style={{ width: '160px', height: '340px' }}>
          <div className="text-center text-white">
            <h2 className="text-[14px]">{weatherData.name}</h2>
            <p className="text-[8px]">{new Date().toLocaleString()}</p>
            <div className="flex justify-center my-2">
              <img src={iconUrl} alt="Weather Icon" className="w-20 h-20" />
            </div>
            <p className="capitalize text-[10px]">{weatherData.weather[0]?.description ?? 'N/A'}</p>
            <h1 className="text-[32px] mt-2">{Math.round(weatherData.main.temp)}°C</h1>
          </div>
          <div className="flex justify-between text-white mt-8 text-[8px]">
            {(['Pressure', 'Humidity', 'Wind'] as const).map((stat) => (
              <div key={stat} className="flex flex-col items-center gap-1">
                <img src={getStatIcon(stat)} alt={`${stat} Icon`} className="w-6 h-6" />
                <p>{stat}</p>
                <p>
                  {stat === 'Pressure' && `${weatherData.main.pressure} hPa`}
                  {stat === 'Humidity' && `${weatherData.main.humidity}%`}
                  {stat === 'Wind' && `${weatherData.wind.speed} km/h`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

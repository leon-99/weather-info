import cityOffsets from 'timezone-name-offsets'

export const weatherUtils = {
  // Calculate time based on timezone offset
  calcTime(offset) {
    const d = new Date()
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    const nd = new Date(utc + (3600000 * offset))
    return { 
      hours: nd.getHours(), 
      minutes: nd.getMinutes(), 
      seconds: nd.getSeconds() 
    }
  },

  // Set background image based on weather code and time of day
  setBackgroundImage(weatherCode, pod) {
    if (pod === 'd') {
      if (weatherCode >= 200 && weatherCode <= 531) return 'rain-d'
      if (weatherCode === 701 || weatherCode === 711 || weatherCode === 721 || weatherCode === 741) return 'foggy-d'
      if (weatherCode >= 600 && weatherCode <= 622) return 'snow-d'
      if (weatherCode >= 803 && weatherCode <= 804) return 'cloudy-d'
      return 'clear-d'
    } else {
      if (weatherCode >= 200 && weatherCode <= 531) return 'rain-n'
      if (weatherCode === 701 || weatherCode === 711 || weatherCode === 721 || weatherCode === 741) return 'foggy-d'
      if (weatherCode >= 600 && weatherCode <= 622) return 'snow-n'
      if (weatherCode >= 803 && weatherCode <= 804) return 'cloudy-n'
      return 'clear-n'
    }
  },

  // Get MDI icon based on weather code and time of day
  getWeatherIcon(weatherCode, pod) {
    // Thunderstorm
    if (weatherCode >= 200 && weatherCode <= 232) {
      return 'mdi-weather-lightning'
    }
    
    // Drizzle
    if (weatherCode >= 300 && weatherCode <= 321) {
      return 'mdi-weather-rainy'
    }
    
    // Rain
    if (weatherCode >= 500 && weatherCode <= 531) {
      return 'mdi-weather-pouring'
    }
    
    // Snow
    if (weatherCode >= 600 && weatherCode <= 622) {
      return 'mdi-weather-snowy'
    }
    
    // Atmosphere (fog, mist, etc.)
    if (weatherCode >= 700 && weatherCode <= 781) {
      return 'mdi-weather-fog'
    }
    
    // Clear
    if (weatherCode === 800) {
      return pod === 'd' ? 'mdi-weather-sunny' : 'mdi-weather-night'
    }
    
    // Clouds
    if (weatherCode >= 801 && weatherCode <= 804) {
      if (weatherCode === 801) {
        return pod === 'd' ? 'mdi-weather-partly-cloudy' : 'mdi-weather-night-partly-cloudy'
      }
      return 'mdi-weather-cloudy'
    }
    
    // Extreme weather (tornado, hurricane, etc.)
    if (weatherCode >= 900 && weatherCode <= 962) {
      return 'mdi-weather-tornado'
    }
    
    // Default fallback
    return 'mdi-weather-cloudy'
  },

  // Set AQI color based on air quality index
  setAQIColor(aqi) {
    if (aqi === null) return ''
    if (aqi > 0 && aqi <= 50) return 'aqi-green'
    if (aqi > 50 && aqi <= 100) return 'aqi-yellow'
    if (aqi > 100 && aqi <= 150) return 'aqi-orange'
    if (aqi > 150 && aqi <= 200) return 'aqi-red'
    if (aqi > 200 && aqi <= 300) return 'aqi-purple'
    return 'aqi-brown'
  },

  // Set windmill speed based on wind speed
  setWindmillSpeed(speedMph) {
    const speed = Math.round(speedMph * 2.237)
    if (speed < 1) return '0s'
    if (speed >= 1 && speed <= 3) return '5s'
    if (speed >= 4 && speed <= 7) return '3s'
    if (speed >= 8 && speed <= 12) return '2s'
    if (speed >= 13 && speed <= 18) return '1s'
    if (speed >= 19 && speed <= 24) return '0.8s'
    if (speed >= 25 && speed <= 31) return '0.5s'
    return '0.3s'
  },

  // Format time based on timezone
  formatTime(data) {
    if (cityOffsets[data.data[0].timezone] !== undefined) {
      const now = this.calcTime(cityOffsets[data.data[0].timezone] / 60)
      const hours = now.hours.toString().length === 1 ? `0${now.hours}` : now.hours
      const minutes = now.minutes.toString().length === 1 ? `0${now.minutes}` : now.minutes
      return `${hours}:${minutes}`
    } else {
      const s = new Date()
      const hours = s.getHours()
      const minutes = s.getMinutes().toString().length === 1 ? `0${s.getMinutes()}` : s.getMinutes()
      return `${hours}:${minutes}`
    }
  }
}

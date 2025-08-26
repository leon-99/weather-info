const API_KEY = 'af2ba8f014284f01a30e7b75f0549add'
const API_UNITS = 'M'

export const weatherApi = {
  // Get weather data by coordinates (for user's location)
  async getWeatherByCoords(lat, lon) {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&units=${API_UNITS}`
    )
    return response.json()
  },

  // Get weather data by city name
  async getWeatherByCity(city) {
    const url = this.filterCityUrl(city)
    const response = await fetch(url)
    return response.json()
  },

  // Get weather alerts by city name
  async getAlertsByCity(cityName) {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/alerts?city=${cityName}&key=${API_KEY}`
    )
    return response.json()
  },

  // Filter city URL for special cases like Los Angeles
  filterCityUrl(city) {
    const cityLower = city.toLowerCase()
    if (cityLower === 'los angeles') {
      return `https://api.weatherbit.io/v2.0/current?city_id=5344994&key=${API_KEY}`
    }
    return `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`
  }
}

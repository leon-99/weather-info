import { ref, reactive } from 'vue'
import { weatherApi } from '@/api/weatherApi'
import { weatherUtils } from '@/utils/weatherUtils'
import { countryCodes } from '@/countryCodes'

export function useWeather() {
  // Reactive state
  const loading = ref(true)
  const infoTexts = ref(false)
  const detailDataTexts = ref(true)
  const bgImage = ref('cloudy-d')
  const aqiColor = ref('')
  const windDegree = ref('')
  const windmillSpeed = ref('0s')
  const time = ref(null)

  // Alert states
  const alertTitleText = ref(false)
  const alertTitle = ref('')
  const alertBody = ref('')
  const alertRegions = ref('')
  const multipleAlertsTitleText = ref(false)
  const multipleAlertsTitle = ref('')
  const multipleAlertsArray = ref([])

  // Weather details
  const details = reactive({
    iconId: null,
    city: null,
    country: null,
    stateCode: '',
    mainTemp: null,
    feelsLikeTemp: null,
    condition: null,
    clouds: '',
    uvi: '',
    humidity: '',
    pressure: '',
    visibility: '',
    dewPoint: '',
    aqi: '',
    slp: '',
    windSpeed: '-'
  })

  // Set weather data from API response
  const setWeatherData = (data) => {
    detailDataTexts.value = true
    loading.value = false
    infoTexts.value = true

    const weatherData = data.data[0]
    
    // Set background image
    bgImage.value = weatherUtils.setBackgroundImage(weatherData.weather.code, weatherData.pod)

    // Set icon based on weather code and time of day using MDI
    details.iconId = weatherUtils.getWeatherIcon(weatherData.weather.code, weatherData.pod)

    // Set state code for US cities
    details.stateCode = weatherData.country_code === 'US' 
      ? `${weatherData.state_code}, `
      : ''

    // Set AQI
    details.aqi = weatherData.aqi !== null ? weatherData.aqi : 'N/A'

    // Set basic weather info
    details.city = weatherData.city_name
    details.country = countryCodes.find(i => i.Code === weatherData.country_code)?.Name || 'Unknown'
    details.condition = weatherData.weather.description
    details.mainTemp = `${Math.round(weatherData.temp)}℃`
    details.feelsLikeTemp = `${Math.round(weatherData.app_temp)}℃`
    details.clouds = `${weatherData.clouds}%`
    details.humidity = `${Math.round(weatherData.rh)}%`
    details.pressure = `${Math.round(weatherData.pres)}mb`
    details.dewPoint = `${Math.round(weatherData.dewpt)}℃`
    details.uvi = Math.round(weatherData.uv)
    details.visibility = `${Math.round(weatherData.vis)}km`
    details.slp = 'N/A'
    details.windSpeed = `${weatherData.wind_spd.toFixed(1)}m/s`
    details.windDir = weatherData.wind_cdir
    windDegree.value = `${weatherData.wind_dir}`

    // Set derived values
    aqiColor.value = weatherUtils.setAQIColor(weatherData.aqi)
    windmillSpeed.value = weatherUtils.setWindmillSpeed(weatherData.wind_spd)
    time.value = weatherUtils.formatTime(data)

    // Get alerts for the city
    getAlerts(weatherData.city_name)
  }

  // Get weather alerts
  const getAlerts = async (cityName) => {
    try {
      const data = await weatherApi.getAlertsByCity(cityName)
      if (data.alerts.length > 1) {
        setMultipleAlerts(data)
      } else if (data.alerts.length === 1) {
        setAlert(data)
      } else {
        alertTitleText.value = false
      }
    } catch (error) {
      console.error('Error fetching alerts:', error)
      alertTitleText.value = false
    }
  }

  // Set single alert
  const setAlert = (data) => {
    alertTitleText.value = true
    alertTitle.value = data.alerts[0].title
    alertBody.value = data.alerts[0].description
    alertRegions.value = data.alerts[0].regions.toString()
  }

  // Set multiple alerts
  const setMultipleAlerts = (data) => {
    multipleAlertsTitleText.value = true
    multipleAlertsTitle.value = `${data.alerts.length} Weather Alerts in this area`
    multipleAlertsArray.value = data.alerts
  }

  // Get weather data by city search
  const getWeatherByCity = async (cityName) => {
    try {
      infoTexts.value = false
      detailDataTexts.value = false
      alertTitleText.value = false
      multipleAlertsTitleText.value = false
      loading.value = true

      const data = await weatherApi.getWeatherByCity(cityName)
      setWeatherData(data)
    } catch (error) {
      console.error('Error fetching weather by city:', error)
      showNotFound(cityName)
    }
  }

  // Get weather data by coordinates (for user's location)
  const getWeatherByCoords = async (pos) => {
    try {
      const data = await weatherApi.getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
      setWeatherData(data)
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error)
      showNotFound()
    }
  }

  // Show not found state
  const showNotFound = (cityName = 'Unknown') => {
    loading.value = false
    infoTexts.value = true
    detailDataTexts.value = true
    
    // Reset all details to default values
    for (const key in details) {
      details[key] = '-'
    }
    
    details.country = "Not Found!"
    details.city = cityName
    windDegree.value = '0'
    aqiColor.value = 'white'
    windmillSpeed.value = '0s'
  }

  // Reset weather data
  const resetWeatherData = () => {
    loading.value = true
    infoTexts.value = false
    detailDataTexts.value = false
    alertTitleText.value = false
    multipleAlertsTitleText.value = false
    
    // Reset details
    Object.keys(details).forEach(key => {
      details[key] = null
    })
    details.windSpeed = '-'
    
    // Reset other states
    bgImage.value = 'cloudy-d'
    aqiColor.value = ''
    windDegree.value = ''
    windmillSpeed.value = '0s'
    time.value = null
  }

  return {
    // State
    loading,
    infoTexts,
    detailDataTexts,
    bgImage,
    aqiColor,
    windDegree,
    windmillSpeed,
    time,
    alertTitleText,
    alertTitle,
    alertBody,
    alertRegions,
    multipleAlertsTitleText,
    multipleAlertsTitle,
    multipleAlertsArray,
    details,
    
    // Methods
    setWeatherData,
    getAlerts,
    setAlert,
    setMultipleAlerts,
    getWeatherByCity,
    getWeatherByCoords,
    showNotFound,
    resetWeatherData
  }
}

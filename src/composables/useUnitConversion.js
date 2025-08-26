import { tempConverter } from '@/utils'

export function useUnitConversion() {
  // Convert between Celsius and Fahrenheit
  const changeUnits = (details) => {
    if (details.mainTemp.slice(-1) === '℃') {
      // Convert from Celsius to Fahrenheit
      details.mainTemp = `${tempConverter.CtoF(details.mainTemp.split('℃')[0])}℉`
      details.feelsLikeTemp = `${tempConverter.CtoF(details.feelsLikeTemp.split('℃')[0])}℉`
      details.dewPoint = `${tempConverter.CtoF(details.dewPoint.split('℃')[0])}℉`
      details.windSpeed = `${(details.windSpeed.split('m/s')[0] * 2.237).toFixed(1)}mph`
    } else {
      // Convert from Fahrenheit to Celsius
      details.mainTemp = `${tempConverter.FtoC(details.mainTemp.split('℉')[0])}℃`
      details.feelsLikeTemp = `${tempConverter.FtoC(details.feelsLikeTemp.split('℉')[0])}℃`
      details.dewPoint = `${tempConverter.FtoC(details.dewPoint.split('℉')[0])}℃`
      details.windSpeed = `${(details.windSpeed.split('mph')[0] / 2.237).toFixed(1)}m/s`
    }
  }

  return {
    changeUnits
  }
}

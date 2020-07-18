import {
    countryCodes
} from "./countryCodes";
import {
    tempConverter
} from "./temp-converter";
const cityOffsets = require('timezone-name-offsets');
export const methodsVue = {
    calcTime(offset) {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return {
            hours: nd.getHours(),
            minutes: nd.getMinutes(),
            seconds: nd.getSeconds()
        }
    },
    locateUserPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(res => {
                this.getDefaultData(res)
            })
        }
    },
    async getDefaultData(pos) { // 
        const res = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&key=${this.API_KEY}&units=${this.API_UNITS}`)
        const data = await res.json();
        this.setData(data);
    },
    async getSearchedData(e) {
        if (e.target.firstChild.value) {
            this.infoTexts = false;
            this.alertTitleText = false;
            this.multipleAlertsTitleText = false;
            this.loading = true;
            const res = await fetch(this.filterCity(e.target.firstChild.value));
            if (res.status === 200) {
                const data = await res.json();
                this.setData(data);
            } else {
                this.showNotFound(e);
            }
        }
    },
    filterCity(city) {
        let searchedCity;
        city === 'los angeles' || city === 'Los Angeles' || city === 'los Angeles' || city === 'Los angeles' || city === 'LOS ANGELES' ? searchedCity = `https://api.weatherbit.io/v2.0/current?city_id=5344994&key=${this.API_KEY}` :
            searchedCity = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${this.API_KEY}`
        return searchedCity;
    },
    setData(data) {
        console.log(data)
        this.loading = false;
        this.infoTexts = true;
        this.details.degreeSymbol = '℃';
        data.data[0].pod === 'd' ? this.details.iconId = `owf-${data.data[0].weather.code}-d` :
            this.details.iconId = `owf-${data.data[0].weather.code}-n`
        this.details.city = data.data[0].city_name;
        this.details.country = countryCodes.find(i => i.Code === data.data[0].country_code).Name;
        this.details.condition = data.data[0].weather.description;
        this.details.mainTemp = Math.round(data.data[0].temp);
        this.details.feelsLikeTemp = Math.round(data.data[0].app_temp);
        this.details.clouds = data.data[0].clouds;
        this.details.humidity = Math.round(data.data[0].rh);
        this.details.pressure = Math.round(data.data[0].pres);
        this.details.dewPoint = Math.round(data.data[0].dewpt);
        this.details.uvi = Math.round(data.data[0].uv);
        this.details.visibility = `${Math.round(data.data[0].vis)}km`;
        this.details.aqi = data.data[0].aqi;
        this.details.slp = 'N/A'
        this.details.windSpeed = `${Math.round(data.data[0].wind_spd * 2.237)}mph`
        this.details.windDir = data.data[0].wind_cdir;
        this.windDegree = data.data[0].wind_dir;
        this.bgImage = 'clear-d'
        // this.setBg(data);
        this.setAQIColor(data);
        this.getAlerts(data);
        this.setTime(data);
    },
    setTime(data) {
        let now = this.calcTime(cityOffsets[data.data[0].timezone] / 60)
        this.time = `${now.hours.toString().length === 1 ? `0${now.hours}` : now.hours}:${now.minutes.toString().length === 1 ? `0${now.minutes}` : now.minutes}`
    },
    async getAlerts(dataPassed) {
        const res = await fetch(`https://api.weatherbit.io/v2.0/alerts?city=${dataPassed.data[0].city_name}&key=${this.API_KEY}`);
        const data = await res.json();
        if (data.alerts.length > 1) {
            this.setMultipleAlerts(data);
        } else if (!(data.alerts.length === 0)) {
            this.setAlert(data);
        } else {
            this.alertTitleText = false;
        }
    },
    setAlert(data) {
        this.alertTitleText = true;
        this.alertTitle = data.alerts[0].title;
        this.alertBody = data.alerts[0].description;
        this.alertRegions = data.alerts[0].regions.toString();
    },
    setMultipleAlerts(data) {
        this.multipleAlertsTitleText = true;
        this.multipleAlertsTitle = `${data.alerts.length} Weather Alerts in this area`;
        this.multipleAlertsArray = data.alerts;
    },
    setBg(data) {
        let id = data.data[0].weather.code;
        if (data.data[0].pod === 'd') {
            id >= 200 && id <= 531 ? this.bgImage = 'rain-d' :
                id === 701 || id === 711 || id === 721 || id === 741 ? this.bgImage = 'foggy-d' :
                id >= 600 && id <= 622 ? this.bgImage = 'snow-d' :
                id >= 803 && id <= 804 ? this.bgImage = 'cloudy-d' :
                this.bgImage = 'clear-d'
        } else {
            id >= 200 && id <= 531 ? this.bgImage = 'rain-n' :
                id === 701 || id === 711 || id === 721 || id === 741 ? this.bgImage = 'foggy-d' :
                id >= 600 && id <= 622 ? this.bgImage = 'snow-n' :
                id >= 803 && id <= 804 ? this.bgImage = 'cloudy-n' :
                this.bgImage = 'clear-n'
        }
    },
    changeDegree() {
        if (this.degreeSymbol === '℃') {
            this.details.mainTemp = tempConverter.CtoF(this.details.mainTemp);
            this.details.feelsLikeTemp = tempConverter.CtoF(this.details.feelsLikeTemp);
            this.details.dewPoint = tempConverter.CtoF(this.details.dewPoint);
            this.degreeSymbol = '℉';
        } else {
            this.details.mainTemp = tempConverter.FtoC(this.details.mainTemp);
            this.details.feelsLikeTemp = tempConverter.FtoC(this.details.feelsLikeTemp);
            this.details.dewPoint = tempConverter.FtoC(this.details.dewPoint);
            this.degreeSymbol = '℃';
        }
        // ℃ ℉
    },
    showNotFound(e) {
        this.loading = false;
        this.infoTexts = true;
        for (const key in this.details) {
            this.details[key] = '-'
        }
        this.details.country = "Not Found!"
        this.details.city = e.target.firstChild.value;
        this.windDegree = '0'
    },
    setAQIColor(data) {
        let aqi = data.data[0].aqi;
        aqi > 0 && aqi <= 50 ? this.aqiColor = 'aqi-green' :
            aqi > 50 && aqi <= 100 ? this.aqiColor = 'aqi-yellow' :
            aqi > 100 && aqi <= 150 ? this.aqiColor = 'aqi-orange' :
            aqi > 150 && aqi <= 200 ? this.aqiColor = 'aqi-red' :
            aqi > 200 && aqi <= 300 ? this.aqiColor = 'aqi-purple' :
            this.aqiColor = 'aqi-brown'
    },
    showSingleAlert() {
        this.$modal.show('single-alert');
    },
    closeSingleAlert() {
        this.$modal.hide('single-alert');
    },
    showMultipleAlerts() {
        this.$modal.show('multiple-alerts');
    },
    closeMultipleAlerts() {
        this.$modal.hide('multiple-alerts');
    },
    getCurrentYear() {
        let date = new Date();
        this.currentYear = date.getFullYear();
    }
}
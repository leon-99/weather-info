import {
    countryCodes
} from "./countryCodes";
import {
    tempConverter
} from "./temp-converter";
export const methodsVue = {
    locateUserPosttion() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(res => {
                this.getDefaultData(res)
            })
        }
    },
    async getDefaultData(pos) {
        const res = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&key=${this.API_KEY}`)
        const data = await res.json();
        this.setData(data);
    },
    async getSearchedData(e) {
        if (e.target.firstChild.value) {
            this.infoTexts = false;
            this.loading = true;
            const res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${e.target.firstChild.value}&key=${this.API_KEY}`);
            if (res.ok === true) {
                const data = await res.json();
                this.setData(data);
            } else {
                this.showNotFound(e);
            }
        }
    },
    setData(data) {
        console.log(data)
        this.loading = false;
        this.infoTexts = true;
        this.degreeSymbol = '℃';
        data.data[0].pod === 'd' ? this.iconId = `owf-${data.data[0].weather.code}-d` :
            this.iconId = `owf-${data.data[0].weather.code}-n`
        this.city = data.data[0].city_name;
        this.country = countryCodes.find(i => i.Code === data.data[0].country_code).Name;
        this.condition = data.data[0].weather.description;
        this.mainTemp = Math.round(data.data[0].temp);
        this.feelsLikeTemp = Math.round(data.data[0].app_temp);
        this.clouds = data.data[0].clouds;
        this.humidity = Math.round(data.data[0].rh);
        this.pressure = Math.round(data.data[0].pres);
        this.dewPoint = Math.round(data.data[0].dewpt);
        this.uvi = Math.round(data.data[0].uv);
        this.visibility = `${Math.round(data.data[0].vis)}km`;
        this.aqi = data.data[0].aqi;
        this.slp = 'N/A'
        this.setBg(data);
        this.setAQIColor(data);
    },
    setBg(data) {
        let id = data.data[0].weather.code;
        if (data.data[0].pod === 'd') {
            id >= 200 && id <= 531 ? this.bgImage = 'rain-d' :
                id === 701 || id === 711 || id === 721 || id === 741 ? this.bgImage = 'rain-d' :
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
            this.mainTemp = tempConverter.CtoF(this.mainTemp);
            this.maxTemp = tempConverter.CtoF(this.maxTemp);
            this.minTemp = tempConverter.CtoF(this.minTemp);
            this.feelsLikeTemp = tempConverter.CtoF(this.feelsLikeTemp);
            this.dewPoint = tempConverter.CtoF(this.dewPoint);
            this.degreeSymbol = '℉';
        } else {
            this.mainTemp = tempConverter.FtoC(this.mainTemp);
            this.maxTemp = tempConverter.FtoC(this.maxTemp);
            this.minTemp = tempConverter.FtoC(this.minTemp);
            this.feelsLikeTemp = tempConverter.FtoC(this.feelsLikeTemp);
            this.dewPoint = tempConverter.FtoC(this.dewPoint);
            this.degreeSymbol = '℃';
        }
        // ℃ ℉
    },
    showNotFound(e) {
        this.loading = false;
        this.infoTexts = true;
        this.country = "Not Found!"
        this.city = e.target.firstChild.value;
        this.localTime = '';
        this.condition = '';
        this.conditionDes = '';
        this.mainTemp = '';
        this.maxTemp = '';
        this.minTemp = '';
        this.feelsLikeTemp = '';
        this.degreeSymbol = '-';
        this.iconId = '';
        this.detailDataTexts = false;
    },
    setAQIColor(data) {
        let aqi = data.data[0].aqi;
        aqi > 0 && aqi <= 50 ? this.aqiColor = 'aqi-green' :
            aqi > 50 && aqi <= 100 ? this.aqiColor = 'aqi-yellow' :
            aqi > 100 && aqi <= 150 ? this.aqiColor = 'aqi-orange' :
            aqi > 150 && aqi <= 200 ? this.aqiColor = 'aqi-red' :
            aqi > 200 && aqi <= 300 ? this.aqiColor = 'aqi-purple' :
            this.aqiColor = 'aqi-brown'
    }
}
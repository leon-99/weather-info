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
        console.log(data);
    },
    async getSearchedData(e) {
        if (e.target.firstChild.value) {
            this.infoTexts = false;
            this.loading = true;
            const res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${e.target.firstChild.value}&key=${this.API_KEY}`);
            console.log(res)
            if (res.ok === true) {
                const data = await res.json();
                this.setData(data);
            } else {
                this.showNotFound(e);
            }
        }
    },
    setData(data) {
        this.loading = false;
        this.infoTexts = true;
        this.degreeSymbol = '℃';
        console.log(data)
        if (data.data.pod === 'd') this.iconId = `owf-${data.data[0].weather.code}-d`;
        else this.iconId = `owf-${data.data[0].weather.code}-n`;
        this.city = data.data[0].city_name;
        this.country = countryCodes.find(i => i.Code === data.data[0].country_code).Name;
        this.condition = data.data[0].weather.description;
        this.mainTemp = Math.round(data.data[0].temp);
        this.feelsLikeTemp = Math.round(data.data[0].app_temp);
        // this.maxTemp = Math.round(data.main.temp_max);
        // this.minTemp = Math.round(data.main.temp_min);
        this.clouds = data.data[0].clouds;
        this.humidity = Math.round(data.data[0].rh);
        this.pressure = Math.round(data.data[0].pres);
        this.dewPoint = Math.round(data.data[0].dewpt);
        this.uvi = Math.round(data.data[0].uv);
        this.visibility = `${Math.round(data.data[0].vis)}km`;
        this.aqi = data.data[0].aqi;
        this.slp = 'N/A'
        this.setBg(data);
    },
    setBg(data) {
        let id = data.data[0].weather.code;
        if (data.data.pod === 'd') {
            if (id >= 200 && id <= 531) {
                this.bgImage = 'rain-d'
            } else if (id === 701 || id === 711 || id === 721 || id === 741) {
                this.bgImage = 'foggy-d'
            } else if (id >= 600 && id <= 622) {
                this.bgImage = 'snow-d'
            } else if (id >= 803 && id <= 804) {
                this.bgImage = 'cloudy-d'
            } else {
                this.bgImage = 'clear-d'
            }
        } else {
            if (id >= 200 && id <= 531) {
                this.bgImage = 'rain-n'
            } else if (id === 701 || id === 711 || id === 721 || id === 741) {
                this.bgImage = 'foggy-d'
            } else if (id >= 600 && id <= 622) {
                this.bgImage = 'snow-n'
            } else if (id >= 803 && id <= 804) {
                this.bgImage = 'cloudy-n'
            } else {
                this.bgImage = 'clear-n'
            }
        }
    },
    changeDegree() {
        if (this.degreeSymbol === '℃') {
            this.mainTemp = tempConverter.CtoF(this.mainTemp);
            this.maxTemp = tempConverter.CtoF(this.maxTemp);
            this.minTemp = tempConverter.CtoF(this.minTemp);
            this.feelsLikeTemp = tempConverter.CtoF(this.feelsLikeTemp);
            this.degreeSymbol = '℉';
        } else {
            this.mainTemp = tempConverter.FtoC(this.mainTemp);
            this.maxTemp = tempConverter.FtoC(this.maxTemp);
            this.minTemp = tempConverter.FtoC(this.minTemp);
            this.feelsLikeTemp = tempConverter.FtoC(this.feelsLikeTemp);
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
    }
}
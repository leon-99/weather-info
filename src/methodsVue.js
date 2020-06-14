export const methodsVue = {
    locateUserPosttion() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(res => {
                this.getDefaultData(res)
            })
        }
    },
    async getDefaultData(pos) {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${this.API_KEY}&units=metric`);
        const data = await res.json();
        this.setData(data);
    },
    async getSearchedData(e) {
        if (e.target.firstChild.value) {
            this.infoTexts = false;
            this.loading = true;
            console.log(e.target.firstChild.value)
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.firstChild.value}&appid=${this.API_KEY}&units=metric`);
            const data = await res.json();
            this.setData(data)
        }
    },
    setData(data) {
        console.log(data);
        this.loading = false;
        this.infoTexts = true;
        const time = new Date();
        if (time.getHours() > 7 && time.getHours() < 18) this.iconId = `owf-${data.weather[0].id}-d`;
        else this.iconId = `owf-${data.weather[0].id}-n`;
        this.city = data.name;
        this.country = data.sys.country;
        this.condition = data.weather[0].main;
        this.conditionDes = data.weather[0].description;
        this.mainTemp = Math.round(data.main.temp);
        this.feelsLikeTemp = Math.round(data.main.feels_like);
        this.maxTemp = Math.round(data.main.temp_max);
        this.minTemp = Math.round(data.main.temp_min);
        this.clouds = data.clouds.all;
        this.humidity = data.main.humidity;
        this.pressure = data.main.pressure;
        this.dewPoint = 'N/A';
        this.uvi = 'N/A';
        if (!(data.visibility)) this.visibility = 'N/A';
        else this.visibility = `${Math.round(data.visibility / 1000)}km`;
        this.setBg(data);
    },
    setBg(data) {
        let id = data.weather[0].id;
        let t = new Date();
        if (t.getHours() >= 6 && t.getHours() <= 18) {
            if (id >= 200 && id <= 531) {
                this.bgImage = 'rain-d'
            } else if (id >= 803 && id <= 804) {
                this.bgImage = 'cloudy-d'
            } else {
                this.bgImage = 'clear-d'
            }
        } else {
            if (id >= 200 && id <= 531) {
                this.bgImage = 'rain-n'
            } else if (id >= 803 && id <= 804) {
                this.bgImage = 'cloudy-n'
            } else {
                this.bgImage = 'clear-n'
            }
        }
    }
}
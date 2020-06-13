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
    async getSearchedData() {
        // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    },
    setData(data) {
        // console.log(data);
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
        this.visibility = data.visibility / 1000;
        this.dewPoint = 'N/A';
        this.uvi = 'N/A';
    }
}
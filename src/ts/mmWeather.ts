namespace mmWeather {
    let mm = mmHelper;
    let weatherContainer = document.querySelector(".mm-weather");

    class Weather {
        name: string;
        weather: string;
        description: string;
        icon: string;
        temp: string;

        constructor(data) {
            this.name = data.name  !== "undefined" ? data.name : "";
            this.weather = data.weather[0].main;
            this.description = data.weather[0].description;
            this.icon = data.weather[0].icon;
            this.temp = (data.main.temp - 273.15).toFixed(2);            
        }

        getTime(data) {
            let d = data.dt_txt !== "undefined" ? data.dt_txt.replace(/\s/g, "T") :  "";
			
			if(d.length > 0) return new Date(d).getDay();

            return;
		}    
    }
    
}
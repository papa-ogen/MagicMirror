// Todo: translate currentWeather.description - http://openweathermap.org/weather-conditions

(function(mm) { 
    let cssContainer = document.querySelector(".mm-weather");
    let mmHelper = mm.mmWeather;

    class Weather {
        constructor(data) {
            this.name = data.name  !== "undefined" ? data.name : "";
            this.weather = data.weather[0].main;
            this.description = data.weather[0].description;
            this.icon = data.weather[0].icon;
            this.temp = (data.main.temp - 273.15).toFixed(1);
            this.getTime = function () {
                let d = data.dt_txt !== "undefined" ? data.dt_txt.replace(/\s/g, "T") :  "";
                let day;

                if(d.length > 0) {
                    day = new Date(d).getDay();
                        return getWeatherDay(day);
                } 
                
                return 0;
            }
        }
    }

    let url = mmHelper.foreCast === true ? mmHelper.forecastUrl : mmHelper.apiUrl;
    let updateInterval = !mmHelper.updateInterval || mmHelper.updateInterval === "undefined" ? 1080000  :  mmHelper.updateInterval; // Every 3 hours per default
    let coordParam = "lat=" + mmHelper.lat + "&lon=" + mmHelper.lon;
    let idParam = "appid=" + mmHelper.apiKey;
    let apiParamString = url + "?" + coordParam + "&" + idParam;

    getWeather(apiParamString);

    setInterval(function() {
        getWeather(apiParamString);
    }, updateInterval); 

	function getWeather(url) {
        let weathers = [];
	    let currentWeather = {};

        mm.getJSON(url, function(err, data) {
            if (err != null) {
                console.log("Something went wrong: " + err);
            } else {
                // Store weather forecast in array of Weather objects
                if(mmHelper.foreCast === true) {
                    data.list.forEach(function( value, index ) {
                        if(index % 8 === 0) {
                            value.name = data.city.name
                            weathers.push(new Weather(value));
                        }
                    });

                } else {
                    currentWeather = new Weather(data);
                }
                
                displayWeather(weathers, currentWeather);
            }
        });
	};
	
	function weatherIconClass(iconCode) {
		switch(iconCode) {
			case "01d":
			case "01n":
				return "mm-weather-icon-sun";
			case "02d":
			case "02n":
				return "mm-weather-icon-few-cloud";
			case "03d":
			case "03n":
				return "mm-weather-icon-cloud";
			case "04d":
			case "04n":
				return "mm-weather-icon-broken-cloud";
			case "09d":
			case "09n":
				return "mm-weather-icon-shower-rain";
			case "10d":
			case "10n":
				return "mm-weather-icon-rain";
			case "11d":
			case "11n":
				return "mm-weather-icon-thunderstorm";
			case "13d":
			case "13n":
				return "mm-weather-icon-snow";
			case "50d":
			case "50n":
				return "mm-weather-icon-mist";
			default:
				return "mm-weather-icon-sun";
		}
	};
	
	function weatherType(type) {
		let _type = type.toLowerCase();
		switch(_type) {
			case "clear":
			case "clear sky": return "klart";
			case "few clouds": return "lite molnigt";
			case "scattered clouds": return "molnigt";
			case "broken clouds": return "mulet";
			case "clouds": return "molnigt";
			case "shower rain": return "täta regnskurar";
			case "rain": return "regn";
			case "thunderstorm": return "åskregn";
			case "snow": return "snöfall";
			case "mist": return "dimma";
            case "clear": return "klart";
			default:
				return _type;
		}
	};
	
	function getWeatherDay(day) {
		switch(day) {
			case 0: return "Söndag";
			case 1: return "Måndag";
			case 2: return "Tisdag";
			case 3: return "Onsdag";
			case 4: return "Torsdag";
			case 5: return "Fredag";
			case 6: return "Lördag";
		}
	}
	
	function displayWeather(weathers, currentWeather) {

        let h1 = cssContainer.getElementsByTagName("h1")[0];
		let icon = cssContainer.getElementsByTagName("i")[0];
		let h3 = cssContainer.getElementsByTagName("h3")[0];

		if(mmHelper.foreCast === true) {
			let df = document.createDocumentFragment();
			let divRow, divCol, divBox, boxH2, boxI, boxH3;

			cssContainer.innerHTML = "";

			h1 = mm._createElement("h1", { 
				text: weathers[0].name
			}, cssContainer);

			divRow = mm._createElement("div", { 
				classList: "row center-xs"
			}, df);

			for(var i = 0; i<3; i++) {
				divCol = mm._createElement("div", { 
					classList: "col-xs-12 col-lg"
				}, divRow);

				divBox = mm._createElement("div", { 
					classList: "box"				}, divCol);

				boxH2 = mm._createElement("h2", {
					text: weathers[i].getTime() + " " + weathers[i].temp + " C°"
				}, divBox);

				boxI = mm._createElement("i", {
					classList: weatherIconClass(weathers[i].icon) + " mm-weather-icon"
				}, divBox);

				boxH3 = mm._createElement("h3", {
					text: weatherType(weathers[i].weather)
				}, divBox);
			}

			cssContainer.appendChild(df);

		} else {
			h1.innerHTML = currentWeather.name + " " + currentWeather.temp + " C°";
			icon.classList = weatherIconClass(currentWeather.icon) + " mm-weather-icon";
			h3.innerHTML = weatherType(currentWeather.weather).capitalizeFirstLetter();
		}
	}
}(mmHelper));
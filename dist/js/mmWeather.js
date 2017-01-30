(function( mmWeather, $, mmHelper, undefined ) { 
	var cssContainer = $(".mm-weather div");
	var mmHelper = mmHelper.mmWeather;
	var Weather = function (data) {
		this.name = data.name  !== "undefined" ? data.name : "";
		this.weather = data.weather[0].main;
		this.description = data.weather[0].description;
		this.icon = data.weather[0].icon;
		this.temp = (data.main.temp - 273.15).toFixed(2);
		this.getTime = function () {
			var d = data.dt_txt !== "undefined" ? data.dt_txt.replace(/\s/g, "T") :  "";
			
			if(d.length > 0) {
				day = new Date(d).getDay();
					return getWeatherDay(day);
			} 
			
			return 0;
		}
	};
	var weathers = [];
	var currentWeather = {};

	mmWeather.init = function() {
		var url = mmHelper.foreCast === true ? mmHelper.forecastUrl : mmHelper.apiUrl;
		var updateInterval = !mmHelper.updateInterval || mmHelper.updateInterval === "undefined" ? 1080000  :  mmHelper.updateInterval; // Every 3 hours per default
		var coordParam = "lat=" + mmHelper.lat + "&lon=" + mmHelper.lon;
		var idParam = "appid=" + mmHelper.apiId;
		var apiParamString = url + "?" + coordParam + "&" + idParam;

		getWeather(apiParamString);
	
		setInterval(function() {
			getWeather(apiParamString);
		}, updateInterval); 
	};

	function getWeather(url) {
		var jqxhr = $.getJSON(url, function(data) {
			
			// Store weather forecast in array of Weather objects
			if(mmHelper.foreCast === true) {				
				$.each(data.list, function( index, value ) {
					if(index % 8 == 0) {
						value.name =  data.city.name
						console.log(value);
						weathers.push(new Weather(value));
					}
				});
			} else {
				currentWeather = new Weather(data);
			}
			
			displayWeather();
							
		}).fail(function() {
			console.log( "error" );
		});
	};
	
	function weatherIconClass(iconCode) {
		switch(iconCode) {
			case "01d":
			case "01n":
				return "mm-weather-icon-sun";
				break;
			case "02d":
			case "02n":
				return "mm-weather-icon-few-cloud";
				break;
			case "03d":
			case "03n":
				return "mm-weather-icon-cloud";
				break;
			case "04d":
			case "04n":
				return "mm-weather-icon-broken-cloud";
				break;
			case "09d":
			case "09n":
				return "mm-weather-icon-shower-rain";
				break;
			case "10d":
			case "10n":
				return "mm-weather-icon-rain";
				break;
			case "11d":
			case "11n":
				return "mm-weather-icon-thunderstorm";
				break;
			case "13d":
			case "13n":
				return "mm-weather-icon-snow";
				break;
			case "50d":
			case "50n":
				return "mm-weather-icon-mist";
				break;
			default:
				return "mm-weather-icon-sun";
		}
	};
	
	function weatherType(type) {
		var type = type.toLowerCase();
		switch(type) {
			case "clear":
			case "clear sky":
				return "klart";
				break;
			case "few clouds":
				return "lite molnigt";
				break;
			case "scattered clouds":
				return "molnigt";
				break;
			case "broken clouds":
				return "mulet";
				break;
			case "clouds":
				return "molnigt";
				break;				
			case "shower rain":
				return "täta regnskurar";
				break;
			case "rain":
				return "regn";
				break;
			case "thunderstorm":
				return "åskregn";
				break;
			case "snow":
				return "snöfall";
				break;
			case "mist":
				return "dimma";
				break;
            case "clear":
                return "klart";
                break;
			default:
				return type;
		}
	};
	
	function getWeatherDay(day) {
		switch(day) {
			case 0:
				return "Söndag";
				break;
			case 1:
				return "Måndag";
				break;
			case 2:
				return "Tisdag";
				break;
			case 3:
				return "Onsdag";
				break;				
			case 4:
				return "Torsdag";
				break;	
			case 5:
				return "Fredag";
				break;
			case 6:
				return "Lördag";
				break;
		}
	}
	
	// Todo: translate currentWeather.description - http://openweathermap.org/weather-conditions
	
	function displayWeather() {
		var ul = "";
		
		cssContainer.html("");
		
		if(mmHelper.foreCast === true) {
			
			cssContainer.append("<h1>" + weathers[0].name + "</h1>");
					
			for(var i = 0; i<3; i++) {
				ul = cssContainer.append("<ul id=\"w" + i + "\"></ul>").find("ul#w" + i + "");
					ul.append("<li>" + weathers[i].getTime() + " " + weathers[i].temp + " C°</li>");
					ul.append("<li><div class=\"" + weatherIconClass(weathers[i].icon) + " mm-weather-icon mm-right\"></div></li>");
					ul.append("<li class=\"mm-weather-type\">" + weatherType(weathers[i].weather).capitalizeFirstLetter() + "</li>");	
				cssContainer.append("<hr class=\"mm-clear\" />");
			}
		} else {
			ul = cssContainer.append("<ul></ul>").find("ul");
				ul.append("<li>" + currentWeather.name + " " + currentWeather.temp + " C°</li>");
				ul.append("<li><div class=\"" + weatherIconClass(currentWeather.icon) + " mm-weather-icon mm-right\"></div></li>");
				ul.append("<li class=\"mm-weather-type\">" + weatherType(currentWeather.weather).capitalizeFirstLetter() + "</li>");
				//	ul.append("<li class=\"mm-weather-descr\">" + currentWeather.description + "</li>");
		}
	};

}( window.mmWeather = window.mmWeather || {}, jQuery, mmHelper ));
	
try { 
	mmWeather.init(); 
} catch( e ) { 
	console.log( e.message ); 
}
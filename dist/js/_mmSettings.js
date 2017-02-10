"use strict";

var mmHelper = {
	mmCalendar: {
		// CLIENT_ID: _config.googleApiKey,
		SCOPES: ["https://www.googleapis.com/auth/calendar.readonly"]
	},
	mmWeather: {
		apiUrl: "http://api.openweathermap.org/data/2.5/weather",
		forecastUrl: "http://api.openweathermap.org/data/2.5/forecast",
		apiId: mmConfig.mmWeather.apiKey,
		lat: mmConfig.mmWeather.lat,
		lon: mmConfig.mmWeather.long,
		updateInterval: mmConfig.mmWeather.updateInterval,
		foreCast: mmConfig.mmWeather.foreCast
	},
	mmClock: {
		apiUrl: "http://api.dryg.net/dagar/v2.1/",
		updateInterval: 60000
	},
	mmCommute: {
		apiUrl: "http://api.sl.se/api2/TravelplannerV2/",
		apiId: mmConfig.mmCommute.apiKey,
	},
	getJSON: function getJSON(apiUrl, callback) {
		var xhr = new XMLHttpRequest();

		xhr.open("get", apiUrl, true);
		xhr.responseType = "json";
		xhr.onload = function () {
			var status = xhr.status;
			if (status == 200) {
				callback(null, xhr.response);
			} else {
				callback(status);
			}
		};

		xhr.send();
	}
};
//# sourceMappingURL=_mmSettings.js.map

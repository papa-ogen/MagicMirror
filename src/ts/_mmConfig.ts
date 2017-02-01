var mmHelper = {
	mmCalendar: {
		// CLIENT_ID: _config.googleApiKey,
		SCOPES: ["https://www.googleapis.com/auth/calendar.readonly"]
	},
	mmWeather: {
		apiUrl: "http://api.openweathermap.org/data/2.5/weather",
		forecastUrl: "http://api.openweathermap.org/data/2.5/forecast",
		// apiId: _config.mmWeather.apiKey,
		// lat: _config.mmWeather.lat,
		// lon: _config.mmWeather.long,
		// updateInterval: _config.mmWeather.updateInterval,
		// foreCast: _config.mmWeather.foreCast
	},
    mmClock: { 
        apiUrl: "http://api.dryg.net/dagar/v2.1/",
        updateInterval: 60000 
    }
};
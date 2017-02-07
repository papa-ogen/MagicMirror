# Raspberry Pi - Magic Mirror

## Demo
Go to http://mm.craven-studio.com/

## Config
Create a local config file in data/config.js
```javascript
var mmConfig = {
    mmWeather: {
        apiKey: "",
		lat: "59.3833",
		long: "17.8333",
		updateInterval: 60000,
		foreCast: true
    }
};
```

## Modules

### Weather
Get current weather base on long and lat.

* First get your API-key: http://openweathermap.org/api
* Update your _config with coordinates and API key.
* foreCast: true dispays a forecast 3 days ahead. Set it to false to display current weather.
* Default update interval is every 3 hours.
* The module also uses a sprite for generating magic mirror friendly icons.

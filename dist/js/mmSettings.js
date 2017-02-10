"use strict";

var mmHelper = {
	mmCalendar: {
		// CLIENT_ID: _config.googleApiKey,
		SCOPES: ["https://www.googleapis.com/auth/calendar.readonly"]
	},
	mmWeather: {
		apiUrl: "http://api.openweathermap.org/data/2.5/weather",
		forecastUrl: "http://api.openweathermap.org/data/2.5/forecast",
		apiKey: mmConfig.mmWeather.apiKey,
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
		apiKey: mmConfig.mmCommute.apiKey
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
	},
	/*
 		Create a HTML Object dynamically
 		Example: 
 		var obj = {
 			classList: "class1 class2",
 			attr: [ ["id", "123"], ["name", "test"] ]
 		};
 		var e = createElement("div", obj, li);
 	*/
	_createElement: function _createElement(element, obj, parent, insertBefore) {
		var e = document.createElement(element);

		if (obj.text) {
			var t = document.createTextNode(obj.text);
			e.appendChild(t);
		}

		if (obj.classList) {
			e.classList = obj.classList;
		}

		if (obj.attr) {
			obj.attr.forEach(function (attr) {

				if (attr[0] === "type" && attr[1] === "checkbox") {
					e.checked = attr[2];
				}

				e.setAttribute(attr[0], attr[1]);
			});
		}

		if (insertBefore) {
			parent.insertBefore(e, parent.children[0]);
		} else {
			parent.appendChild(e);
		}

		return e;
	}
};
//# sourceMappingURL=mmSettings.js.map

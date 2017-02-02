var mmHelper = {
    mmCalendar: {
        // CLIENT_ID: _config.googleApiKey,
        SCOPES: ["https://www.googleapis.com/auth/calendar.readonly"]
    },
    mmWeather: {
        apiUrl: "http://api.openweathermap.org/data/2.5/weather",
        forecastUrl: "http://api.openweathermap.org/data/2.5/forecast"
    },
    mmClock: {
        apiUrl: "http://api.dryg.net/dagar/v2.1/",
        updateInterval: 60000
    }
};
var mmClock;
(function (mmClock) {
    var Clock = (function () {
        function Clock() {
        }
        Clock.prototype.Time = function () {
            var _this = this;
            var d = new Date();
            var hours = d.getHours().toString();
            var minutes = d.getMinutes().toString();
            setTimeout(function () { _this.Time(); }, 1000);
            if (hours.length === 1) {
                hours = "0" + hours;
            }
            if (minutes.length === 1) {
                minutes = "0" + minutes;
            }
            document.querySelector(".mm-hour").textContent = hours;
            document.querySelector(".mm-minute").textContent = minutes;
        };
        return Clock;
    })();
    var WeekDay = (function () {
        function WeekDay() {
            this.weekDays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Saturday", "Sunday"];
            var d = new Date();
            var weekDay = d.getDay();
            this.weekDay = this.weekDays[weekDay];
        }
        WeekDay.prototype.getWeekDay = function () {
            return this.weekDay;
        };
        return WeekDay;
    })();
    var MonthDate = (function () {
        function MonthDate(d) {
            this.months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni",
                "Juli", "Augusti", "September", "Oktober", "November", "December"];
            this.currentMonth = d.getMonth();
            this.currentDate = d.getDate();
        }
        MonthDate.prototype.getCurrentDate = function () {
            return this.months[this.currentMonth] + " " + this.currentDate;
        };
        return MonthDate;
    })();
    var Names = (function () {
        function Names(helper) {
            this.apiUrl = helper.apiUrl + '?nocache=' + (new Date()).getTime();
            this.updateInterval = helper.updateInterval;
        }
        Names.prototype.getJSON = function (callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("get", this.apiUrl, true);
            xhr.responseType = "json";
            xhr.onload = function () {
                var status = xhr.status;
                if (status == 200) {
                    callback(null, xhr.response);
                }
                else {
                    callback(status);
                }
            };
            xhr.send();
        };
        Names.prototype.addNames = function () {
            var _this = this;
            this.getJSON(function (err, data) {
                if (err != null) {
                    console.log("Something went wrong: " + err);
                }
                else {
                    console.log(data);
                    document.querySelector(".mm-names").textContent = data.dagar[0].namnsdag.join(", ");
                }
            });
            setTimeout(function () { _this.addNames(); }, 360000);
        };
        return Names;
    })();
    var clock = new Clock();
    clock.Time();
    var weekday = new WeekDay();
    var curDate = new MonthDate(new Date());
    document.querySelector(".mm-datetime").textContent = weekday.getWeekDay() + ", " + curDate.getCurrentDate();
    var names = new Names(mmHelper.mmClock);
    names.addNames();
})(mmClock || (mmClock = {}));
var mmWeather;
(function (mmWeather) {
    var mm = mmHelper;
    var weatherContainer = document.querySelector(".mm-weather");
    var Weather = (function () {
        function Weather(data) {
            this.name = data.name !== "undefined" ? data.name : "";
            this.weather = data.weather[0].main;
            this.description = data.weather[0].description;
            this.icon = data.weather[0].icon;
            this.temp = (data.main.temp - 273.15).toFixed(2);
        }
        Weather.prototype.getTime = function (data) {
            var d = data.dt_txt !== "undefined" ? data.dt_txt.replace(/\s/g, "T") : "";
            if (d.length > 0)
                return new Date(d).getDay();
            return;
        };
        return Weather;
    })();
})(mmWeather || (mmWeather = {}));

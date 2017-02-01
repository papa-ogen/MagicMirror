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
var mmClock = (function () {
    function mmClock() {
    }
    mmClock.prototype.Time = function () {
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
    return mmClock;
})();
var mmWeekDay = (function () {
    function mmWeekDay() {
        this.weekDays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Saturday", "Sunday"];
        var d = new Date();
        var weekDay = d.getDay();
        this.weekDay = this.weekDays[weekDay];
    }
    mmWeekDay.prototype.getWeekDay = function () {
        return this.weekDay;
    };
    return mmWeekDay;
})();
var mmDate = (function () {
    function mmDate(d) {
        this.months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni",
            "Juli", "Augusti", "September", "Oktober", "November", "December"];
        this.currentMonth = d.getMonth();
        this.currentDate = d.getDate();
    }
    mmDate.prototype.getCurrentDate = function () {
        return this.months[this.currentMonth] + " " + this.currentDate;
    };
    return mmDate;
})();
var mmNames = (function () {
    function mmNames(url) {
        this.apiUrl = url;
    }
    mmNames.prototype.getJSON = function (callback) {
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
    mmNames.prototype.getNamesDayNames = function (data) {
        var namesDayNames = data.dagar[0].namnsdag;
        return namesDayNames.join(", ");
    };
    mmNames.prototype.addNames = function () {
        var _this = this;
        this.getJSON(function (err, data) {
            if (err != null) {
                console.log("Something went wrong: " + err);
            }
            else {
                document.querySelector(".mm-names").textContent = _this.getNamesDayNames(data);
            }
        });
    };
    return mmNames;
})();
var clock = new mmClock();
clock.Time();
var weekday = new mmWeekDay();
var curDate = new mmDate(new Date());
document.querySelector(".mm-datetime").textContent = weekday.getWeekDay() + ", " + curDate.getCurrentDate();
var names = new mmNames("http://api.dryg.net/dagar/v2.1/");
names.addNames();

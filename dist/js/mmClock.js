"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (mm) {
    var Clock = function () {
        function Clock() {
            _classCallCheck(this, Clock);
        }

        _createClass(Clock, [{
            key: "setTime",
            value: function setTime() {
                var _this = this;

                var d = new Date();
                var hours = d.getHours().toString();
                var minutes = d.getMinutes().toString();

                setTimeout(function () {
                    _this.setTime();
                }, 1000);

                if (hours.length === 1) {
                    hours = "0" + hours;
                }

                if (minutes.length === 1) {
                    minutes = "0" + minutes;
                }

                document.querySelector(".mm-hour").textContent = hours;
                document.querySelector(".mm-minute").textContent = minutes;
            }
        }]);

        return Clock;
    }();

    var WeekDay = function () {
        function WeekDay() {
            var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

            _classCallCheck(this, WeekDay);

            this.weekDays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Saturday", "Sunday"];
            this.weekDay = this.weekDays[d.getDay()];
        }

        _createClass(WeekDay, [{
            key: "getWeekDay",
            value: function getWeekDay() {
                return this.weekDay;
            }
        }]);

        return WeekDay;
    }();

    var MonthDate = function () {
        function MonthDate(d) {
            _classCallCheck(this, MonthDate);

            this.months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
            this.currentMonth = d.getMonth();
            this.currentDate = d.getDate();
        }

        _createClass(MonthDate, [{
            key: "getCurrentDate",
            value: function getCurrentDate() {
                return this.months[this.currentMonth] + " " + this.currentDate;
            }
        }]);

        return MonthDate;
    }();

    var Names = function () {
        function Names(helper) {
            _classCallCheck(this, Names);

            this.apiUrl = helper.apiUrl + '?nocache=' + new Date().getTime();
            this.updateInterval = helper.updateInterval;
        }

        _createClass(Names, [{
            key: "addNames",
            value: function addNames() {
                var _this2 = this;

                mm.getJSON(this.apiUrl, function (err, data) {
                    if (err != null) {
                        console.log("Something went wrong: " + err);
                    } else {
                        document.querySelector(".mm-names").textContent = data.dagar[0].namnsdag.join(", ");
                    }
                });

                setTimeout(function () {
                    _this2.addNames();
                }, 360000);
            }
        }]);

        return Names;
    }();

    var clock = new Clock();
    clock.setTime();

    var weekday = new WeekDay();
    var curDate = new MonthDate(new Date());

    document.querySelector(".mm-datetime").textContent = weekday.getWeekDay() + ", " + curDate.getCurrentDate();

    var names = new Names(mm.mmClock);
    names.addNames();
})(mmHelper);
//# sourceMappingURL=mmClock.js.map

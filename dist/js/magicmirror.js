var mmConfig = {};
var test = "mmCalendar";
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
var mmDate = (function () {
    function mmDate() {
        this.weekDays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Saturday", "Sunday"];
        var d = new Date();
        var weekDay = d.getDay();
        this.weekDay = this.weekDays[weekDay];
    }
    mmDate.prototype.getWeekDay = function () {
        var d = new Date();
        var weekDay = d.getDay();
        this.weekDay = this.weekDays[weekDay];
        return this.weekDay;
    };
    return mmDate;
})();
window.onload = function () {
    var clock = new mmClock();
    clock.Time();
    var mmDate = new mmDate();
    // console.log(mmDate.getWeekDay());
};

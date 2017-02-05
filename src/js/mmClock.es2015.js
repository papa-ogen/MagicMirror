(function(){
    class Clock {
        setTime() {
            var d = new Date();
            var hours = d.getHours().toString();
            var minutes = d.getMinutes().toString();
            
            setTimeout(() => { this.setTime(); }, 1000);
            
            if (hours.length === 1) {
                hours = "0" + hours;
            }

            if (minutes.length === 1) {
                minutes = "0" + minutes;
            }
            
            document.querySelector(".mm-hour").textContent = hours;
            document.querySelector(".mm-minute").textContent = minutes;
        }
    }

    class WeekDay {
        constructor(d = new Date()) {
            this.weekDays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Saturday", "Sunday"];
            this.weekDay = this.weekDays[d.getDay()];
        }

        getWeekDay() {
            return this.weekDay;
        }
    }

    class MonthDate {
        constructor(d) {
            this.months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni",
        "Juli", "Augusti", "September", "Oktober", "November", "December"];
            this.currentMonth = d.getMonth();
            this.currentDate = d.getDate();

        }

        getCurrentDate() {
            return this.months[this.currentMonth] + " " + this.currentDate;
        }
    }

    class Names {
        constructor(helper) {
            this.apiUrl = helper.apiUrl + '?nocache=' + (new Date()).getTime();
            this.updateInterval = helper.updateInterval
        }

        getJSON(callback) {
            var xhr = new XMLHttpRequest();

            xhr.open("get", this.apiUrl, true);
            xhr.responseType = "json";
            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status);
                }
            };

            xhr.send();
        }

        addNames() {
            this.getJSON(function(err, data) {
                if (err != null) {
                    console.log("Something went wrong: " + err);
                } else {
                    document.querySelector(".mm-names").textContent = data.dagar[0].namnsdag.join(", ");
                }
            });

            setTimeout(() => { this.addNames(); }, 360000);
        }
    }

    let clock = new Clock();
    clock.setTime();

    let weekday = new WeekDay();
    let curDate = new MonthDate(new Date());

    document.querySelector(".mm-datetime").textContent = weekday.getWeekDay() + ", " + curDate.getCurrentDate();

    let names = new Names(mmHelper.mmClock);
    names.addNames();
})();
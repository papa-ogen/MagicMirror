namespace mmClock {
    class Clock {
        Time() {
            var d = new Date();
            var hours = d.getHours().toString();
            var minutes = d.getMinutes().toString();
            
            setTimeout(() => { this.Time(); }, 1000);
            
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
        weekDays: string[] = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Saturday", "Sunday"];
        weekDay: string;

        constructor() {
            let d = new Date();
            let weekDay = d.getDay();
            this.weekDay = this.weekDays[weekDay];
        }

        getWeekDay() {
            return this.weekDay;
        }
    }

    class MonthDate {
        months: string[] = ["Januari", "Februari", "Mars", "April", "Maj", "Juni",
        "Juli", "Augusti", "September", "Oktober", "November", "December"];
        currentMonth: number;
        currentDate: number;

        constructor(d: Date) {
            this.currentMonth = d.getMonth();
            this.currentDate = d.getDate();

        }

        getCurrentDate() {
            return this.months[this.currentMonth] + " " + this.currentDate;
        }
    }

    class Names {
        apiUrl: string;
        updateInterval: number;
        
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
                    console.log(data);
                    document.querySelector(".mm-names").textContent = data.dagar[0].namnsdag.join(", ");
                }
            });

            setTimeout(() => { this.addNames(); }, 360000);
        }
    }

    var clock = new Clock();
    clock.Time();

    var weekday = new WeekDay();

    var curDate = new MonthDate(new Date());

    document.querySelector(".mm-datetime").textContent = weekday.getWeekDay() + ", " + curDate.getCurrentDate();

    var names = new Names(mmHelper.mmClock);
    names.addNames();
}
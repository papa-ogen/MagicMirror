class mmClock {
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

class mmWeekDay {
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

class mmDate {
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

interface Name {
  name: string;
}

class mmNames {
    apiUrl: string;
    
    constructor(url: string) {
        this.apiUrl = url;
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

    getNamesDayNames(data) {
        let namesDayNames = data.dagar[0].namnsdag;

        return namesDayNames.join(", ");
    }    

    addNames() {
        let _this = this;

        this.getJSON(function(err, data) {
            if (err != null) {
                console.log("Something went wrong: " + err);
            } else {
                document.querySelector(".mm-names").textContent = _this.getNamesDayNames(data);
            }
        });
    }
}

var clock = new mmClock();
clock.Time();

var weekday = new mmWeekDay();

var curDate = new mmDate(new Date());

document.querySelector(".mm-datetime").textContent = weekday.getWeekDay() + ", " + curDate.getCurrentDate();

var names = new mmNames("http://api.dryg.net/dagar/v2.1/");
names.addNames();
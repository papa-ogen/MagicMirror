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


class mmDate {
     weekDays: string[] = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Saturday", "Sunday"];
     weekDay: string;

    constructor() {
        var d = new Date();
        var weekDay = d.getDay();
        this.weekDay = this.weekDays[weekDay];
    }

    getWeekDay() {
        var d = new Date();
        var weekDay = d.getDay();
        this.weekDay = this.weekDays[weekDay];        
        return this.weekDay;
    }
}

window.onload = () => {
    var clock = new mmClock();
    clock.Time();

    var mmDate = new mmDate();

    // console.log(mmDate.getWeekDay());
};
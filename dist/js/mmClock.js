(function (mmClock, $, mmHelper, undefined) { 
    //Private Property 
    var time = new Date();
    var cssContainer = $(".mm-clock");
	var mmHelper = mmHelper.mmClock;
    
	var Clock = function (data) {
		this.date = data.dagar[0].datum;
		this.weekDay = data.dagar[0].veckodag;
        this.names = getNamesDayNames(data);
        this.currentTime = getTime();
	};
	var currentClock = {};    
 
    //Public Method
    mmClock.init = function() {
		var url = mmHelper.apiUrl;
        var d = new Date();
        
		var dateUrlPart = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();

		var apiFullUrl = url + dateUrlPart;

		getValues(apiFullUrl);
        
        var updateInterval = !mmHelper.updateInterval || mmHelper.updateInterval == "undefined" ? 60000 :  mmHelper.updateInterval;
        
		setInterval(function() {
			getValues(apiFullUrl);
		}, updateInterval);        
    };
 
    //Private Method
    function getValues(url) {
		var jqxhr = $.getJSON(url, function(data) {
			currentClock = new Clock(data);
			displayClock();
		}).fail(function() {
			console.log( "error" );
		});
	};
    
    function getNamesDayNames(data) {
        var namesDayNames = data.dagar[0].namnsdag;
        if (namesDayNames.length === 0) {
            return "";
        }
        return namesDayNames.toString();
    }
    
    function getTime() {
        var d = new Date();
        
        var hours = d.getHours().toString();
        if (hours.length === 1) {
            hours = "0" + hours;
        }
        
        var minutes = d.getMinutes().toString();
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        
        return hours + ":" + minutes;
    }
    
	function displayClock() {
        $(".mm-clock time").text(currentClock.currentTime);
        $(".mm-clock date").text(currentClock.weekDay + " - " + currentClock.date);
        $(".mm-names").text(currentClock.names);
	};
    
 
}( window.mmClock = window.mmClock || {}, jQuery, mmHelper ));

try { 
  mmClock.init(); 
} catch( e ) { 
  console.log( e.message ); 
}
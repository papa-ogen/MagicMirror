"use strict";

// API must communicate server side so this module is disabled for now

(function (mm) {
    var mmHelper = mm.mmCommute;
    var cssContainer = document.querySelector(".mm-commute");

    var params = {
        originCoordLat: "59.3833",
        originCoordLong: "17.8333",
        originCoordName: "Tellusvägen",
        destCoordLat: "59,3308",
        destCoordLong: "18,0631",
        destCoordName: "T-centralen"
    };

    var paramStr = "&originCoordLat=" + params.originCoordLat;
    paramStr += "&originCoordLong=" + params.originCoordLong;
    paramStr += "&originCoordName=" + params.originCoordName;
    paramStr += "&destCoordLat=" + params.destCoordLat;
    paramStr += "&destCoordLong=" + params.destCoordLong;
    paramStr += "&destCoordName=" + params.destCoordName;

    var url = mmHelper.apiUrl + "trip.json?key=" + mmHelper.apiKey + paramStr;

    // mm.getJSON(url, function(err, data) {
    //     if (err != null) {
    //         console.log("Something went wrong: " + err);
    //     } else {
    //        console.log(data);
    //     }
    // });    

    console.log(url, mmHelper.apiKey);

    cssContainer.innerHTML = "SL API";
})(mmHelper);

// http://api.sl.se/api2/TravelplannerV2/trip.json?key=b87fe35366e144edb77b1aa99305cd90&originCoordLat=59.3833&originCoordLong=17.8333&originCoordName=Tellusv%C3%A4gen&destCoordLat=59,3308&destCoordLong=18,0631&destCoordName=T-centralen
//# sourceMappingURL=mmCommute.js.map

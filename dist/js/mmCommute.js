"use strict";

(function (mm) {
    var mmHelper = mm.mmCommute;
    var cssContainer = document.querySelector(".mm-commute");

    var params = {
        originCoordLat: "",
        originCoordLong: "",
        originCoordName: "",
        destCoordLat: "",
        destCoordLong: "",
        destCoordName: ""
    };

    // Trip example: http://api.sl.se/api2/TravelplannerV2/trip.<FORMAT>?key=<DIN API NYCKEL>&parametrar
    var url = mmHelper.apiUrl + "trip.json?key=" + mmHelper.apiKey;

    mm.getJSON(url, function (err, data) {
        if (err != null) {
            console.log("Something went wrong: " + err);
        } else {
            console.log(data);
        }
    });

    // https://www.trafiklab.se/api/sl-reseplanerare-2/dokumentation-sl-reseplanerare-2
    // https://www.trafiklab.se/api/sl-reseplanerare/dokumentation-sl-reseplanerare
    // console.log(mmHelper.apiUrl, mmHelper.apiKey);

    cssContainer.innerHTML = "SL API";
})(mmHelper);
//# sourceMappingURL=mmCommute.js.map

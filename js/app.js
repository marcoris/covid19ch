"use strict";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Set response data
        var data = JSON.parse(xhttp.responseText)[0];
        var confirmed = data.confirmed;
        var recovered = data.recovered;
        var deaths = data.deaths;

        // Display data
        document.getElementById("confirmed").innerHTML = confirmed;
        document.getElementById("recovered").innerHTML = recovered;
        document.getElementById("deaths").innerHTML = deaths;
    }
};
xhttp.open("GET", "https://covid19.mathdro.id/api/countries/ch/recovered", true);
xhttp.send();
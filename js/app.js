"use strict";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Set response data
        var data = JSON.parse(xhttp.responseText)[0];
        var confirmed = data.confirmed;
        var recovered = data.recovered;
        var deaths = data.deaths;
        var swissPopulation = 8570000;
        var infectedWidth = 100 / swissPopulation * (confirmed + recovered + deaths) + 10;
        var populationWidth = 100 - infectedWidth;

        // Display data
        document.getElementById("confirmed").innerHTML = confirmed;
        document.getElementById("recovered").innerHTML = recovered;
        document.getElementById("deaths").innerHTML = deaths;
        document.getElementById("population").style.width = populationWidth + '%';
        document.getElementById("population").innerHTML = populationWidth.toFixed(2) + '%';
        document.getElementById("infected").style.width = infectedWidth + '%';
        if (infectedWidth > 15) {
            document.getElementById("infected").innerHTML = infectedWidth.toFixed(2) + '%';
        }
    }
};
xhttp.open("GET", "https://covid19.mathdro.id/api/countries/ch/recovered", true);
xhttp.send();
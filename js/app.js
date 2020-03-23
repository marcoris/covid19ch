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
        var infectedWidth = 100 / swissPopulation * (confirmed + recovered + deaths);
        var populationWidth = 100 - infectedWidth;
        var currentConfirmed = 0;
        var currentRecovered = 0;
        var currentDeaths = 0;
        var currentPopulation = 0;

        // Confirmed
        var timerConfirmed = setInterval(function() {
            currentConfirmed += 1;
            document.getElementById("confirmed").innerHTML = currentConfirmed;
            if (currentConfirmed >= 500) {
                document.getElementById("confirmed").innerHTML = confirmed;
                clearInterval(timerConfirmed);
            }
        }, 0);
        
        // Recovered
        var timerRecovered = setInterval(function() {
            currentRecovered += 1;
            document.getElementById("recovered").innerHTML = currentRecovered;
            if (currentRecovered == recovered) {
                clearInterval(timerRecovered);
            }
        }, 0);
        
        // Deaths
        var timerDeaths = setInterval(function() {
            currentDeaths += 1;
            document.getElementById("deaths").innerHTML = currentDeaths;
            if (currentDeaths == deaths) {
                clearInterval(timerDeaths);
            }
        }, 0);

        document.getElementById("population").style.width = populationWidth + '%';
        document.getElementById("infected").style.width = infectedWidth + '%';
        
        // Show population percentage when there is enought space
        if (populationWidth > 15) {
            var timerPopulation = setInterval(function() {
                currentPopulation += 0.1;
                document.getElementById("population").innerHTML = currentPopulation.toFixed(2) + '%';
                if (currentPopulation >= 30) {
                    document.getElementById("population").innerHTML = populationWidth.toFixed(2) + '%';
                    clearInterval(timerPopulation);
                }
            }, 0);
        }

        // Show infected percentage when there is enought space
        if (infectedWidth > 15) {
            document.getElementById("infected").innerHTML = infectedWidth.toFixed(2) + '%';
        }
    }
};
xhttp.open("GET", "https://covid19.mathdro.id/api/countries/ch/recovered", true);
xhttp.send();
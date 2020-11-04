var apiKey = "76244bc3926e8cc4187446fcb65160e1";
var activeCityName = "";



//get the value that was inputed from the search
var searchName = function() {
    var name = $("#search-bar")
    .val()
    .trim();

    //insert new active name
    activeCityName = name;

    fivedayForecast(name)
}


//get the 5 day weather forecast
var fivedayForecast = function(cityName) {
    var apiUrl =("http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey);
    
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};



$("#button-addon2").on("click", searchName)
//searchName();
//fivedayForecast();
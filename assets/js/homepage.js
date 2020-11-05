var apiKey = "76244bc3926e8cc4187446fcb65160e1";
//storage section
var storedLocations = $("#stored-locations");
//active section
var activeCityName = "";
var temp = $("#temp");
var humi = $("#humi");
var wind = $("#wind");
var uv = $("#uv");
var activeTitle = $("#active-city");


//display the content
var display = function(data) {
    //get the name of the city
    var name = data.city.name;
    console.log(name);
    //get the date
    var date = moment().local().format("MM/DD/YY");

    
    console.log(date);
}


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
    var apiUrl =("http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid="+apiKey);
    
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                display(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};



$("#button-addon2").on("click", searchName)
//searchName();
//fivedayForecast();
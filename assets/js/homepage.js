var apiKey = "76244bc3926e8cc4187446fcb65160e1";
var apiKey2 = "514eacd0018f9117c6b60ae205c7e3af";
//storage section
var storedLocations = $("#stored-locations");
//active section
var activeCityName = "";
var temp = $("#temp");
var humi = $("#humi");
var wind = $("#wind");
var uv = $("#uv");
var activeTitle = $("#active-city");


//get the date
var dateFinder = function() {
    var date = moment().local().format("MM/DD/YY");
    return date;
    //console.log(date);
}

//display the content
var display = function(data) {
    //get the date
    var date = dateFinder();

    console.log(date)
    //get the name of the city
    var name = data.city.name;
    console.log(name);

    //get the temp
    var temper = data.list[0].main.temp + "F";
    console.log(temper);

    //get the humidity
    var humidity = data.list[0].main.humidity + "%";
    console.log(humidity);

    //get the wind
    var windy = data.list[0].wind.speed + "mph";
    console.log(windy);

    activeTitle.text(name + " " + date);

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
   var apiUrl =("http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&cnt=5&appid="+apiKey);
    
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
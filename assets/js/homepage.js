var apiKey = "76244bc3926e8cc4187446fcb65160e1";
//var apiKey2 = "514eacd0018f9117c6b60ae205c7e3af";
//storage section
var storedLocations = $("#stored-locations");
var savedArr = [];

//active section
var activeCityName = "";
var temp = $("#temp");
var humi = $("#humi");
var wind = $("#wind");
var uv = $("#uv");
var activeTitle = $("#active-city");

//load names
var loadNames = function() {
    var name = JSON.parse(localStorage.getItem("CityNames"));
    //empty current list
    //for loop in new list
}


//finalize the UV Index
var uvFinal = function(data) {
    var uvIndex = data.value;
    console.log(uvIndex);
    uv.text("UV Index: " + uvIndex);
}

//Get the UV
var uvCity = function(data) {
    //lat and lon from cit call
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;
    
    //look up the uv with lat and lon
    apiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey;
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                uvFinal(data);
            });
        } else {
            alert ("No UV Index found");
        };
    });

};

//get the date
var dateFinder = function() {
    var date = moment().local().format("MM/DD/YY");
    return date;
    //console.log(date);
};

//display the content
var display = function(data) {
    //get the uv
    //var uv = uvCity();

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

    //Display Name and Date
    activeTitle.text(name + " " + date);

    //Display Temp
    temp.text(temper);

    //Display Humidity
    humi.text(humidity);

    //Display Wind
    wind.text(windy);
};


//get the value that was inputed from the search
var searchName = function() {
    var name = $("#search-bar")
    .val()
    .trim();

    //insert new active name
    activeCityName = name;
    fivedayForecast(name)

    //add name to local storage
    savedArr.push(name);
    localStorage.setItem("CityNames", JSON.stringify(savedArr));
};


//get the 5 day weather forecast
var fivedayForecast = function(cityName) {
   var apiUrl =("http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&cnt=5&appid="+apiKey);
    
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                display(data);
                uvCity(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};



$("#button-addon2").on("click", searchName)
//searchName();
//fivedayForecast();
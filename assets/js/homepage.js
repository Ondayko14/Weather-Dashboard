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
var rightContainer = $("#right-side-container");

//Card Section
var cardContainer = $("#five-day");


//load names
var loadNames = function() {
    var name = JSON.parse(localStorage.getItem("CityNames"));
    //empty current list
    $("#stored-locations button").remove();
    //for loop in new list
    for(i = 0; i < name.length; i++) {
        //create an element
        var button = $("<button>")
        .addClass("text-uppercase list-group-item list-group-item-action")
        .attr({type: "button", id: i})
        .text(name[i]);

        storedLocations.append(button);

    }
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
    //The Uv is found in the uvCity/uvFinal functions
    //get the date
    var date = dateFinder();

    //get the name of the city
    var name = data.city.name;

    //get the temp
    var temper = "Temperature: " + data.list[0].main.temp + "F";

    //get the humidity
    var humidity = "Humidity: " + data.list[0].main.humidity + "%";

    //get the wind
    var windy = "Wind: " + data.list[0].wind.speed + "mph";

    //Display Name and Date
    activeTitle.text(name + " " + date);

    //Display Temp
    temp.text(temper);

    //Display Humidity
    humi.text(humidity);

    //Display Wind
    wind.text(windy);

    //remove hidden from style
    rightContainer.css("display", "block");
};

var displayCards = function(data) {
    //empty old cards
    $("#five-day div").remove();
    for (i = 1; i < 6; i++) {
        //create the cards
        //container
        var div = $("<div>")
        .addClass("card text-white bg-primary mb-3 col-xl-2 col-sm-12")
        .css("max-width", "15rem");
        //append
        cardContainer.append(div);

        //header. Get the Dates
        var date = moment().local().add(i,'d').format("MM/DD/YY");
        console.log(date);
        //place the date in the head
        var header = $("<div>")
        .addClass("card-header")
        .text(date);
        //append
        div.append(header);

        //make the body
        var body = $("<div>")
        .addClass("card-body");
        //append
        div.append(body);

        //h5 element. Get the emoji
        var emoji = data.list[i].weather[0].icon;
        //make the h5
        var h5 = $("<h5>")
        .addClass("card-title")
        .text(emoji);
        //append
        body.append(h5);

        //make the p element. Get the temp
        var pT = "Temperature: " + data.list[i].main.temp + "F";
        //make the first p
        var pTEl = $("<p>")
        .addClass("card-text text-left")
        .text(pT);
        //append
        h5.append(pTEl);

        //make the 2nd P element. Get the Humidity
        var pH = "Humidity: " + data.list[i].main.humidity + "%";
        //make the 2nd p
        var pHEl = $("<p>")
        .addClass("card-text")
        .text(pH);
        //append
        h5.append(pHEl);

    }
}

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

    //call the load function
    loadNames();
};


//get the 5 day weather forecast
var fivedayForecast = function(cityName) {
   var apiUrl =("http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&cnt=6&appid="+apiKey);
    
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                display(data);
                uvCity(data);
                displayCards(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

//when the history button is clicked, the function runs again


loadNames();

$("#button-addon2").on("click", searchName);

//when the search button is clicked, identify which one it is then rehit the api
$("#stored-locations").click(function(event) {
    var id = event.target.id;
    var buttonSelect = event.target.textContent;
    fivedayForecast(buttonSelect);
    console.log(id);
    console.log(buttonSelect);
    console.log(event);
});

// get element IDs 
var tempElement = document.getElementById("temp");
var descriptionEl = document.getElementById("skies");
var minEl = document.getElementById("min");
var maxEl = document.getElementById("max");
var cityEl = document.getElementById("city");
var weatherImgEl = document.getElementById("weather-img");

// get time 
var date = new Date();
const hourMin = date.toLocaleTimeString('en-US', {
    // en-US can be set to 'default' to use user's browser settings
    hour: '2-digit',
    minute: '2-digit',
  });


var timePara = document.getElementById("time");
var timeMobile = document.getElementById("time-mobile");
timePara.innerHTML = hourMin;
timeMobile.innerHTML = hourMin;

// Get Weather Data
function getData() {

    var zipCode = document.getElementById('zipcode').value;
    var url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=4c4bf9966171c40dc8fc61454992bf5f&units=imperial`;

    // fetch weather data
    fetch(url, {
        method: 'get'
    }).then(function(response){
        return response.json();
    }).then(function(json){

    // Get Image Code & replace image
    var imgCode = json.weather[0].icon;
    console.log(imgCode);
    var imgURL = `https://openweathermap.org/img/wn/${imgCode}@2x.png`;
    console.log(imgURL);

    switch (imgCode) {
        case "01d":
            weatherImgEl.src = "images/sunny.png";
            break;
        default: 
            weatherImgEl.src = imgURL;
            break;
    }
    

    // Update Place 
     var city = json.name;
     cityEl.innerHTML = city;

    // Update Temp
     var temp = json.main.temp;
     tempElement.innerHTML = temp + "&deg";
    
    // Update Weather Description
     var desc = json.weather[0].description;
     desc = desc.toUpperCase();
  //   console.log(desc);
     descriptionEl.innerHTML = desc;

    //Update Min & Max 
     var min = json.main.temp_min;
     minEl.innerHTML = min;

     var max = json.main.temp_max;
     maxEl.innerHTML = max;

        

    }).catch(function(error) {
        console.log("Please Enter a Valid Zip Code");
    });

}



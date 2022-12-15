
// get element IDs 
var tempElement = document.getElementById("temp");
var descriptionEl = document.getElementById("skies");
var minEl = document.getElementById("min");
var maxEl = document.getElementById("max");
var cityEl = document.getElementById("city");
var weatherImgEl = document.getElementById("weather-img");
var sunriseEl = document.getElementById("riseTime");
var sunsetEl = document.getElementById("sunsetTime");
var windSpdEl = document.getElementById("windSpeed");
var humidityEl = document.getElementById("humidPercent");
const apiKey = process.env.WEATHER_API_KEY;

// get current time 
var date = new Date();
var hourMin = date.toLocaleTimeString('en-US', {
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
    var url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`;

    // fetch weather data
    fetch(url, {
        method: 'get'
    }).then(function(response){
        return response.json();
    }).then(function(json){

    // Get Image Code & replace image
    var imgCode = json.weather[0].icon;
    var imgURL = `https://openweathermap.org/img/wn/${imgCode}@2x.png`;

    switch (imgCode) {
        case "01d":
            weatherImgEl.src = "images/sunny.png";
            weatherImgEl.alt = "image of sun.";
            break;
        case "01n":
            weatherImgEl.src = "images/crescent-moon.png";
            weatherImgEl.alt = "image of crescent-moon";
            break;
        case "02d":
            weatherImgEl.src = "images/day-partly-cloud.png";
            weatherImgEl.alt = "image of sun within clouds";
            break;
        case "02n":
            weatherImgEl.src = "images/night-partly-cloudy.png";
            weatherImgEl.alt = "image of moon within clouds";
            break;
        case "03d": 
        case "03n":
        case "04d":
        case "04n":
            weatherImgEl.src = "images/cloudy.png";
            weatherImgEl.alt = "image of cloud.";
            break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            weatherImgEl.src = "images/rain.png";
            weatherImgEl.alt = "image of rain coming down from clouds";
            break;
        case "11d":
        case "11n":
            weatherImgEl.src = "images/thunderstorm.png";
            weatherImgEl.alt = "image of dark clouds with thunderbolts";
            break;
        case "13d":
        case "13n":
            weatherImgEl.src = "images/snow.png";
            weatherImgEl.alt = "image of snowflakes falling";
            break;
        case "50d":
        case "50n":
            weatherImgEl.src = "images/fog.png";
            weatherImgEl.alt = "image of cloud with fog";
            break;
        default: 
            weatherImgEl.src = imgURL;
            weatherImgEl.alt = json.weather[0].description;
            break;
    }
    

    // Update Place 
     var city = json.name;
     cityEl.innerHTML = city;

    // Update Temp
     var temp = json.main.temp;
     tempElement.innerHTML = temp + "&degF";
    
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

    // Update Sunrise Time 
    var sunrise = json.sys.sunrise;
    sunrise = sunrise * 1000;
    var sunriseObj = new Date (sunrise);
    sunrise = sunriseObj.toLocaleTimeString('en-US', {
        // en-US can be set to 'default' to use user's browser settings
        hour: '2-digit',
        minute: '2-digit',
      });

      sunriseEl.innerHTML = sunrise;

    // Update Sunset Time
    var sunset = json.sys.sunset;
    sunset = sunset * 1000;
    var sunsetObj = new Date (sunset);
    sunset = sunsetObj.toLocaleTimeString('en-US', {
        // en-US can be set to 'default' to use user's browser settings
        hour: '2-digit',
        minute: '2-digit',
      });

    sunsetEl.innerHTML = sunset;

    // Update Wind Speed 
    var windSpeed = json.wind.speed;
    windSpdEl.innerHTML = windSpeed;

    // Update Humidity Percentage
    var humidityPercentage = json.main.humidity;
    humidityEl.innerHTML = humidityPercentage;


    }).catch(function(error) {
        console.log("Please Enter a Valid Zip Code");
    });

}



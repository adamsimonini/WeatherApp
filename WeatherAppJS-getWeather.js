//GET WEATHER

var tempKelvin = undefined;
var tempToggle = true;



  function getWeather(lat, long){

        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=58748f2a8d98a84d9e4428c1fa051d70";
        $.getJSON(api, function(data){

          // START SUNRISE & SUNSET TIME

          var sunrise = [];
          var sunset = [];
          var unixSunrise = data.sys.sunrise;
          var unixSunset = data.sys.sunset;

          var sunriseMod = new Date(unixSunrise * 1000)
          var sunrise = [
             sunriseMod.getUTCFullYear(),
             sunriseMod.getUTCMonth()+1,
             sunriseMod.getUTCDate(),
             sunriseMod.getUTCHours(),
             sunriseMod.getUTCMinutes(),
          ];

          var sunsetMod = new Date(unixSunset * 1000)
          var sunset = [
             sunsetMod.getUTCFullYear(),
             sunsetMod.getUTCMonth()+1,
             sunsetMod.getUTCDate(),
             sunsetMod.getUTCHours(),
             sunsetMod.getUTCMinutes(),
          ];
          suntime.innerHTML = '<p><i class="fa fa-clock-o fa-1x"></i> UTC Sunrise: ' + sunrise[0] + "/" + sunrise[1] + "/" + sunrise[2] + " @ " + sunrise[3] + ":" + sunrise[4] +
          '<br><i class="fa fa-clock-o fa-1x"></i> UTC Sunset: ' + sunset[0] + "/" + sunset[1] + "/" + sunset[2] + " @ " + sunset[3] + ":" + sunset[4] + '</p>';

          //FINISH SUNRISE & SUNSET TIME

          $("#cityName").html("City Name: " + data.name);
          $("#windSpeed").html("Wind Speeds: " + data.wind.speed);
          skies = data.weather[0].main;
          $("#skies").html("Skies: " + skies);
          skies = skies.toLowerCase();
          changeBackground(skies);
          tempKelvin = data.main.temp;
            if(tempToggle == true)
            {
              $("#temperature").html("Temperature: " + (tempKelvin - 273.15).toFixed(1) + "&#8451");
            }else if (tempToggle == false){
              $("#temperature").html("Temperature: " + (tempKelvin * (9/5) - 459.67).toFixed(1) + "&#x2109");
            }
          });

}

      //CHANGE BACKGROUND IMAGE

  function changeBackground(skies){
    var icon = document.getElementById("icon");
      switch(skies){
         case "clouds":
               $('body').css('backgroundImage', 'url(http://res.cloudinary.com/redkasa/image/upload/v1490221812/overcast_ich0ar.jpg)');
               icon.innerHTML = "<img src='http://openweathermap.org/img/w/02d.png'alt='cloudy icon' height='50%' width='%'>";
               break;
         case "scattered clouds":
              $('body').css('backgroundImage', 'url(http://res.cloudinary.com/redkasa/image/upload/v1490222142/few_clouds_fnq7o9.jpg)');
              icon.innerHTML = "<img src='http://openweathermap.org/img/w/02d.png'alt='cloudy icon' height='50%' width='50%'>";
              break;
         case "rain":
         case "shower":
              $('body').css('backgroundImage', 'url(http://res.cloudinary.com/redkasa/image/upload/v1490221815/rainy_lyyecc.jpg)');
              icon.innerHTML = "<img src='http://openweathermap.org/img/w/09d.png'alt='rain icon' height='50%' width='50%'>";
              break;
         case "clear":
              $('body').css('backgroundImage', 'url(http://res.cloudinary.com/redkasa/image/upload/v1490221830/sunny_egatse.jpg)');
              icon.innerHTML = "<img src='http://openweathermap.org/img/w/01d.png'alt='clear icon' height='50%' width='50%'>";
              break;
          case "thunderstorm":
              $('body').css('backgroundImage', 'url(http://res.cloudinary.com/redkasa/image/upload/v1490221784/stormy_rgwxxc.jpg)');
              icon.innerHTML = "<img src='http://openweathermap.org/img/w/11d.png'alt='thunderstorm icon' height='100%' width='100%'>";
              break;
          case "mist":
          case "overcast":
              $('body').css('backgroundImage', 'url(http://res.cloudinary.com/redkasa/image/upload/v1490221803/misty_l8dist.jpg)');
              icon.innerHTML = "<img src='http://openweathermap.org/img/w/50d.png'alt='mist icon' height='50%' width='50%'>";
              break;
          case "snow":
              $('body').css('backgroundImage', 'url(http://res.cloudinary.com/redkasa/image/upload/v1490221820/snowy_xitfub.jpg)');
              icon.innerHTML = "<img src='http://openweathermap.org/img/w/13d.png'alt='snow icon' height='50%' width='50%'>";
              break;
         case "broken":
              $('body').css('backgroundImage', 'url(http://res.cloudinary.com/redkasa/image/upload/v1490221812/overcast_ich0ar.jpg)');
              icon.innerHTML = "<img src='http://openweathermap.org/img/w/04d.png'alt='overcast icon' height='50%' width='50%'>";
              break;
         default:
            return;
      }
  }

/*
    TORONTO CITY ID = 6167865
    MY API KEY = 58748f2a8d98a84d9e4428c1fa051d70
*/

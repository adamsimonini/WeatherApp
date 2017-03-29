var lat = 0;
var long = 0;

$(document).ready(function(){

        $('#temperatureToggle').change(function() {
              if(tempToggle == true){
                tempToggle = false;
                 if(!isNaN(tempKelvin)){
                    $("#temperature").html("Temperature: " + (tempKelvin * (9/5) - 459.67).toFixed(1) + "&#x2109");
                  }else{
                    return;
                  }
              }else if(tempToggle == false){
                  tempToggle = true;
                  if(!isNaN(tempKelvin)){
                    $("#temperature").html("Temperature: " + (tempKelvin - 273.15).toFixed(1) + "&#8451");
                  }else{
                    return;
                  }
              }
        });

        $(function() {
        $('#temperatureToggle').bootstrapToggle({
          on: 'Enabled',
          off: 'Disabled'
        });
      });

    //GET GEOLOCATION

    function geoFindMe() {

      var output = document.getElementById("getLocation");
      var imageOutput = document.getElementById("getLocationImg");

      if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
      }

      function success(position) {
        lat = position.coords.latitude.toFixed(5);
        long = position.coords.longitude.toFixed(5);
        getWeather(lat, long);

        output.innerHTML = '<p><i class="fa fa-map-pin fa-1x"></i> Latitude: ' + lat + '&#xb0 <br><i class="fa fa-map-pin fa-1x"></i> Longitude: ' + long + '&#xb0</p>';

        var map = new Image();
        map.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=8&size=150x150&sensor=false";

        if($('#getLocationImg').html() == ''){
            imageOutput.appendChild(map);
        }else{
          return;
        }
      }

      function error() {
        output.innerHTML = "Unable to retrieve your location";
      }

      output.innerHTML = "<p></p>";

      navigator.geolocation.getCurrentPosition(success, error);
    }

        var deferred = geoFindMe();
          $.when(deferred).done(new function orderFunctions(){
          getWeather();
          changeBackground();
        });
});

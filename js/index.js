// wu api key: a1c8c0ce38e772c8
$(document).ready(function(){
  var lat = "",
      lon = "",
      state = "",
      city = "",
      temp_f = "",
      temp_c = "",
      weather = "",
      icon = "";
  
  function getBackground(weather) {
    switch(weather) {
      case "chanceflurries":
      case "chancesleet":
      case "sleet":
      case "chancesnow":
      case "flurries":
      case "snow":
        return "snow";
        break;
      case "rain":
      case "chancerain":
        return "rain";
        break;
      case "tstorms":
      case "chancestorms":
        return "tstorms";
        break;
      case "partlycloudy":
      case "partlysunny":
      case "cloudy":
      case "hazy":
      case "partlycloudy":
      case "mostlycloudy":
        return "coudy";
        break;
      case "fog":
        return "fog";
        break;
      case "clear":
      case "mostlysunny":
        return "clear";
        break;
      default:
        return "cloudy";
        break;
    }
  }
  
  function getWeather(data) {
    lat = data.coords.latitude;
    lon = data.coords.longitude;

        
    
    $.getJSON('http://api.wunderground.com/api/a1c8c0ce38e772c8/geolookup/q/' + lat + ',' + lon + '.json', function(data) {
      city = data.location.city;
      state = data.location.state;
      
      $("#location").html(city + ", " + state);
      
      $.getJSON('http://api.wunderground.com/api/a1c8c0ce38e772c8/conditions/q/' + state + '/' + city + '.json', function(data) {
        temp_f = data.current_observation.temp_f;
        temp_c = data.current_observation.temp_c;
        weather = data.current_observation.weather;
        icon = data.current_observation.icon;
        console.log(icon);
        
        $("body").addClass(getBackground(icon));
        $("#wu-link").attr("href", data.current_observation.ob_url);
        $("#temp-f").html(temp_f + " &#8457;");
        $("#temp-c").html(temp_c + " &#8451;");
        $("#conditions").html(weather);
        $("#icon").attr("src", 'http://icons.wxug.com/i/c/i/' + icon + '.gif');
      });
    });    
  };

  navigator.geolocation.getCurrentPosition(getWeather);

  $("#temp-div").on("click", function(){
    $("#temp-f").toggle();
    $("#temp-c").toggle();    
  });

});
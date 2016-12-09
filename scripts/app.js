// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {

  // CODE IN HERE!
$.ajax({
  method: "get",
  url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
  dataType: "json",
  data: $("body").serialize(),
  success: success,
})

var map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 37.78, lng: -122.44},
  zoom: 3
});

var houseMarker = {url: "earthquake.png", scaledSize: new google.maps.Size (22, 32)};


function success(json) {
  json.features.forEach(function(quakes){

    var lngLat = {
      lng: quakes.geometry.coordinates[0],
      lat: quakes.geometry.coordinates[1]
    }

    var timeSince = time(quakes);
    var templateHtml = template({
        magnitude: quakes.properties.mag,
        place: quakes.properties.place,
        time: timeSince
      });
      
      $("#info").append(templateHtml);
      marker = new google.maps.Marker({
        map: map,
        position: lngLat,
        icon: houseMarker
      });
  });
}

var source = $("#info-template").html();
var template = Handlebars.compile(source);
});

function time(quakes) {
  var quakeTime = quakes.properties.time;
  var now = Date.now();
  return ((now - quakeTime)/(1000 * 60 * 60 * 24)).toFixed(2);
}

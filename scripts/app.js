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



function success(json) {
  json.features.forEach(function(quakes){
    var timeSince = time(quakes);
    var templateHtml = template({
        magnitude: quakes.properties.mag,
        place: quakes.properties.place,
        time: timeSince
      });
      $("#info").append(templateHtml);
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

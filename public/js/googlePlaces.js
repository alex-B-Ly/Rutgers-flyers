$(document).ready(function() {

  alert('hello');

  var elem = new Foundation.Accordion('accordion');

  $('accordion').foundation('down');

  // var googlePlacesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  // var apiKey = 'AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg';
  // var latLng = '40.4861111,-74.4522222';
  // var radius = 10000;
  // var type = 'restaurant';
  // var apiEndPoint = googlePlacesURL + 'key=' + apiKey + '&location=' + latLng + '&radius=' + radius + '&type=' + type;

  // console.log(apiEndPoint);
  // $.getJSON(apiEndPoint, data, success) {
  //   for (var restaurant in data) {
  //     console.log(data[restaurant].results[0])
  //   }
  // }

});
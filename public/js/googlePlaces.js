$(document).ready(function() {

    //Set Parameters
    var googlePlacesURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    var apiKey = 'AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg';
    var latLng = '40.4861111,-74.4522222';
    var radius = 10000;
    var type = 'restaurant';

    //Build URL
    var apiEndPoint = googlePlacesURL + 'key=' + apiKey + '&location=' + latLng + '&radius=' + radius + '&type=' + type;

    //Reveal Data
    $.getJSON(apiEndPoint, function(data) {
        buildPanel(data);
    });

    // function buildPanel(data) {


    // }

});
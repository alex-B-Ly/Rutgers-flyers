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
    // $.getJSON(apiEndPoint, function(data) {
    //     buildPanel(data);
    // });

    buildPanel()
    //Build Panel w/ Restaurant Data
    function buildPanel(data) {
        var panel = $('<div>').addClass('panel panel-default');
        var panelBody = $('<div>').addClass('panel-body');
        var row = $('<div>').addClass('row');
        var col4 = $('<div>').addClass('col-xs-4');
        var col12 = $('<div>').addClass('col-xs-12');
        var image = $('<img>')
            .addClass('img-thumbnail')
            .attr('src', 'http://img2.10bestmedia.com/Images/Photos/261521/Restaurant---Cristal-Room--J-r-me-Mondi-re_54_990x660.jpg')
            .attr('alt', '...');
 
        var imgColumn = col4.append(image);
        var imgRow = row.append(imgColumn);
        var imgBody = panelBody.append(imgRow);
        var imgContainer = panel.append(imgBody);

        var panelContents = $('.main-column').append(imgContainer);
        var newEntry = $('.main-row').append(panelContents);

    }

});
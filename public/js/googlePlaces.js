$(document).ready(function() {

    //Set Parameters
    var googlePlacesURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    var apiKey = 'AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg';
    var latLng = '40.4861111,-74.4522222';
    var radius = 10000;
    var type = 'restaurant';

    //Build URL
    var apiEndPoint = googlePlacesURL + 'key=' + apiKey + '&location=' + latLng + '&radius=' + radius + '&type=' + type;
    console.log(apiEndPoint);
    $.getJSON(apiEndPoint, function(data) {
        buildPanel(data);
    });
    //Build Panel w/ Restaurant Data
    function buildPanel(data) {
        var panel = $('<div>').addClass('panel panel-default');
        var panelBody = $('<div>').addClass('panel-body');
        // var col4 = $('<div>').addClass('col-xs-4');
        var col12 = $('<div>').addClass('col-xs-12');
        var image = $('<img>')
            .addClass('img-thumbnail')
            .attr('src', 'http://img2.10bestmedia.com/Images/Photos/261521/Restaurant---Cristal-Room--J-r-me-Mondi-re_54_990x660.jpg')
            .attr('alt', '...');
        
        //Dynamically add first column of restaurant data
        var imgColumn = $('<div>').addClass('col-xs-4').append(image);

        //Dynamically add 2nd column of restaurant data
        var restaurant = data.results[1].name;
        var restaurantTitle = $('<h2>').html(restaurant);
        var restaurantContainer = col12.append(restaurantTitle);
        var restaurantRow = $('<div>').addClass('row').append(restaurantContainer);
        var restaurantColumn = $('<div>').addClass('col-xs-4').append(restaurantRow);


        // var placeURL = 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg&placeid='
        // var placeId = data.results[0].place_id;
        // var placeEndPoint = placeURL + placeId;
        // $.getJSON(placeEndPoint, function(placeData) {
        //     var streetNumber = data.results[0].addressComponents[0].short_name;
        //     var streetName = data.results[0].addressComponents[1].short_name;
        //     var city =  data.results[0].addressComponents[2].short_name;
        //     var state = data.results[0].addressComponents[3].short_name;
        //     var zipCode = data.results[0].addressComponents[4].short_name;
        //     var address = streetNumber + " " + streetName + " " + city + " " + state + " " + zipCode; 

        // });

        //Append all columns to panel
        var contentRow = $('<div>').addClass('row content-row');
        var imageContainer = contentRow.append(imgColumn);
        var restaurantContainer = contentRow.append(restaurantColumn);
        var contentPanelBody = panelBody.append(contentRow);
        var newPanel = panel.append(contentPanelBody);
        var panelContents = $('.main-column').append(newPanel);



    }

});
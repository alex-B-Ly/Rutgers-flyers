$(document).ready(function() {

  //Set Parameters
  var googlePlacesURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  var apiKey = 'AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg';
  var latLng = '40.4861111,-74.4522222';
  var radius = 10000;
  var type = 'restaurant';

  //Build URL
  var apiEndPoint = googlePlacesURL + 'key=' + apiKey + '&location=' + latLng + '&radius=' + radius + '&type=' + type;

  //Ajax call
  $.getJSON(apiEndPoint, function(data) {
    buildPanel(data);
  });

  //Build Panel w/ Restaurant Data
  function buildPanel(data) {
    for (var i = 0; i < data.results.length; i++) {
      var panel = $('<div>').addClass('panel panel-default');
      var panelBody = $('<div>').addClass('panel-body');
      var image = $('<img>')
        .addClass('img-thumbnail')
        .attr('src', 'http://img2.10bestmedia.com/Images/Photos/261521/Restaurant---Cristal-Room--J-r-me-Mondi-re_54_990x660.jpg')
        .attr('alt', '...');

      //Show restaurant data
      var restaurant = data.results[i].name;
      var restaurantTitle = $('<h2>').html(restaurant);
      var restaurantColumn = $('<div>').addClass('col-xs-12').append(restaurantTitle);
      var restaurantRow = $('<div>').addClass('row').append(restaurantColumn);


      //Build specific location url
      var placeURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg&placeid='
      var placeId = data.results[i].place_id;
      var placeEndPoint = placeURL + placeId;
      console.log(placeEndPoint);

      //Show Address
      function getAddress(endpoint, callback) {
        $.getJSON(endpoint, function (placeData) {
          var streetNumber = placeData.result.address_components[0].short_name;
          var streetName = placeData.result.address_components[1].short_name;
          var city =  placeData.result.address_components[2].short_name;
          var state = placeData.result.address_components[3].short_name;
          var zipCode = placeData.result.address_components[5].short_name;
          var address = streetNumber + " " + streetName + " " + city + " " + state + " " + zipCode;
          callback(address);
        });

      }
      getAddress(placeEndPoint, function(address) {
        var restaurantAddress = $('<h4>').addClass('text-muted').append(address);
        var addressColumn = $('<div>').addClass('col-xs-12').append(restaurantAddress);
        var addressRow = $('<div>').addClass('row').append(addressColumn);
        secondColumn.append(addressRow);
      });


      //Show Icon & Rating
      var icon = $('<i>').addClass('fa fa-star-o fa-3x');
      var iconColumn = $('<div>').addClass('col-xs-2 col-xs-offset-3').append(icon);

      var rating =  data.results[i].rating;
      var ratingResults = $('<h2>').html(rating + " Stars");
      var ratingColumn = $('<div>').addClass('col-xs-7').append(ratingResults);

      var ratingRow = $('<div>').addClass('row').append(iconColumn);
      ratingRow.append(ratingColumn);

      //Show Status
      var status = data.results[i].opening_hours.open_now;
      var statusText;

      if (status === true) {
        statusText = $('<h4>').addClass('open-now text-center').html('Open Now');
      } else {
        statusText = $("<h4>").addClass('text-center').html('Closed Now');
      }

      var statusColumn = $("<div>")
        .addClass('col-xs-5 col-xs-offset-4')
        .append(statusText);
      var statusRow = $('<div>').addClass('row').append(statusColumn);

      //Dynamically add data to columns
      var firstColumn = $('<div>').addClass('col-xs-4').append(image);
      var secondColumn = $('<div>').addClass('col-xs-4').append(restaurantRow);
      var thirdColumn = $('<div>').addClass('col-xs-4').append(ratingRow);

      thirdColumn.append(statusRow);

      //Append all columns to panel
      var contentRow = $('<div>').addClass('row content-row');
      contentRow.append(firstColumn);
      contentRow.append(secondColumn);
      contentRow.append(thirdColumn);
      var contentPanelBody = panelBody.append(contentRow);
      var newPanel = panel.append(contentPanelBody);
      var panelContents = $('.main-column').append(newPanel);

    }

  }

});
// $(document).ready(function() {

//   //Set Parameters
//   var googlePlacesURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
//   var apiKey = 'AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg';
//   var latLng = '40.4861111,-74.4522222';
//   var radius = 10000;
//   var type = 'restaurant';

//   //Build URL
//   var apiEndPoint = googlePlacesURL + 'key=' + apiKey + '&location=' + latLng + '&radius=' + radius + '&type=' + type;
//   console.log(apiEndPoint);

//   //Ajax call to get restaurant data based on location and radius
//   $.getJSON(apiEndPoint, function(data) {

//     for (var i = 0; i < data.results.length; i++) {

//       //Build unique URL for each individual place
//       var placeURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg&placeid='
//       var placeId = data.results[i].place_id;
//       var placeEndPoint = placeURL + placeId;
//       console.log(placeEndPoint);
    
//       (function(index) {
//         //Get unique data for each restaurant based on initial API call
//         $.getJSON(placeEndPoint, function (placeData) {
//             //Get address data
//             var streetNumber = placeData.result.address_components[0].short_name;
//             var streetName = placeData.result.address_components[1].short_name;
//             var city =  placeData.result.address_components[2].short_name;
//             var state = placeData.result.address_components[3].short_name;
//             var zipCode = placeData.result.address_components[5].short_name;
//             var address = streetNumber + " " + streetName + " " + city + " " + state + " " + zipCode;

//             //Get name and open/closed status of each restaurant
//             var restaurant = data.results[index].name;
//             var rating = data.results[index].rating;
//             var status = data.results[index].opening_hours.open_now;

//             //Add image 
//             var imageId = data.results[index].photos[0].photo_reference;
//             var imageUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&maxheight=300&photoreference=' + imageId + '&key=' + apiKey;
//             var image = $("<img>").attr('src', imageUrl).addClass('img-thumbnail center-block');

//             //Pass data to buildPanel function to create unique panel for each restaurant
//             buildPanel(address, restaurant, rating, status, image); 
//         });
//       })(i);


//     } 

//   });

//   //Build Panel w/ Restaurant Data
//   function buildPanel(address, restaurant, rating, status, image) {

//       //Show restaurant title and address
//       var restaurantTitle = $('<h2>').addClass('text-center').html(restaurant);
//       var restaurantColumn = $('<div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12').append(restaurantTitle);
//       var restaurantRow = $('<div>').addClass('row').append(restaurantColumn);


//       var restaurantAddress = $('<h4>').addClass('text-muted text-center').append(address);
//       var addressColumn = $('<div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12').append(restaurantAddress);
//       var addressRow = $('<div>').addClass('row').append(addressColumn);


//       //Show Open/Closed Status
//       var statusText;

//       if (status === true) {
//         statusText = $('<h4>').addClass('alert alert-success text-center').html('Open Now');
//       } else {
//         statusText = $("<h4>").addClass('alert alert-danger text-center').html('Closed Now');
//       }

//       var statusColumn = $("<div>")
//         .addClass('col-xs-6 col-xs-offset-3 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3')
//         .append(statusText);
//       var statusRow = $('<div>').addClass('row').append(statusColumn);

//       //Show Buttons
//       var reviewButton = $('<button>').addClass('btn btn-default btn-block').html('Reviews');
//       var reviewButtonColumn = $('<div>').addClass('col-xs-6 col-sm-6 col-md-4 col-md-offset-1 col-lg-4 col-lg-offset-1').append(reviewButton);
//       var infoButton = $('<button>').addClass('btn btn-primary btn-block').html('More Info');
//       var infoButtonColumn = $('<div>').addClass('col-xs-6 col-sm-6 col-md-4 col-md-offset-1 col-lg-4 col-lg-offset-1').append(infoButton);
//       var buttonRow = $('<div>').addClass('row button-row').append(reviewButtonColumn);
//       buttonRow.append(infoButtonColumn);

//       //Dynamically add content to columns
//       var firstColumn = $('<div>')
//         .addClass('col-xs-12 col-sm-12 col-md-5 col-lg-5')
//         .append(image);
//       var secondColumn = $('<div>')
//         .addClass('col-xs-12 col-sm-12 col-md-7 col-lg-7')
//         .append(restaurantRow)
//         .append(addressRow)
//         .append(statusRow)
//         .append(buttonRow);

//       //Append all columns to panel
//       var panel = $('<div>').addClass('panel panel-default');
//       var panelBody = $('<div>').addClass('panel-body');
//       var contentRow = $('<div>').addClass('row content-row');
//       contentRow.append(firstColumn);
//       contentRow.append(secondColumn);
//       var contentPanelBody = panelBody.append(contentRow);
//       var newPanel = panel.append(contentPanelBody);
//       var panelContents = $('.main-column').append(newPanel);

//     }

// });
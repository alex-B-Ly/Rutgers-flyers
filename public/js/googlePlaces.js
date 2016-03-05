window.getPlaceData = function(category) {
  //Set Parameters
  var googlePlacesURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  var apiKey = 'AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg';
  var latLng = '40.4861111,-74.4522222';
  var radius = 2000;
  var type = category;

  //Build URL
  var apiEndPoint = googlePlacesURL + 'key=' + apiKey + '&location=' + latLng + '&radius=' + radius + '&type=' + type;

  //Ajax call to get restaurant data based on location and radius
  $.getJSON(apiEndPoint, function(data) {

    for (var i = 0; i < data.results.length; i++) {

      //Build unique URL for each individual place
      var placeURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg&placeid=';
      var placeId = data.results[i].place_id;
      var placeEndPoint = placeURL + placeId;
    
      (function(index) {
        //Get unique data for each restaurant based on initial API call
        $.getJSON(placeEndPoint, function (placeData) {
            //Get address data
            var streetNumber = placeData.result.address_components[0].short_name;
            var streetName = placeData.result.address_components[1].short_name;
            var city =  placeData.result.address_components[2].short_name;
            var state = placeData.result.address_components[3].short_name;
            var zipCode = placeData.result.address_components[5].short_name;
            var address = streetNumber + " " + streetName + " " + city + " " + state + " " + zipCode;

            //Get name and open/closed status of each restaurant
            var restaurant = data.results[index].name;
            var rating = data.results[index].rating;
            var status = data.results[index].opening_hours.open_now;

            //Get specific id for each restaurant to pass to data-tag
            var placeDataId = data.results[index].place_id;

            //Add image 
            var imageId = data.results[index].photos[0].photo_reference;
            var imageUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&maxheight=300&photoreference=' + imageId + '&key=' + apiKey;
            var image = $("<img>").attr('src', imageUrl).addClass('img-thumbnail center-block');

            //Pass data to buildPanel function to create unique panel for each restaurant
            buildPanel(address, restaurant, rating, status, image, placeDataId); 
        });
      })(i);


    } 

  });

  //Build Panel w/ Restaurant Data
  function buildPanel(address, restaurant, rating, status, image, placeDataId) {

      //Show restaurant title and address
      var restaurantTitle = $('<h2>').addClass('text-center').html(restaurant);
      var restaurantColumn = $('<div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12').append(restaurantTitle);
      var restaurantRow = $('<div>').addClass('row').append(restaurantColumn);


      var restaurantAddress = $('<h4>').addClass('text-muted text-center').append(address);
      var addressColumn = $('<div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12').append(restaurantAddress);
      var addressRow = $('<div>').addClass('row').append(addressColumn);


      //Show Open/Closed Status
      var statusText;

      if (status === true) {
        statusText = $('<h4>').addClass('alert alert-success text-center').html('Open Now');
      } else {
        statusText = $("<h4>").addClass('alert alert-danger text-center').html('Closed Now');
      }

      var statusColumn = $("<div>")
        .addClass('col-xs-6 col-xs-offset-3 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3')
        .append(statusText);
      var statusRow = $('<div>').addClass('row').append(statusColumn);

      //Show Buttons
      var reviewButton = $('<button>')
        .addClass('btn btn-default btn-block review-button')
        .attr('data-place-id', placeDataId)
        .html('Reviews');
      var reviewButtonColumn = $('<div>').addClass('col-xs-6 col-sm-6 col-md-4 col-md-offset-1 col-lg-4 col-lg-offset-1').append(reviewButton);
      var infoButton = $('<button>')
        .addClass('btn btn-primary btn-block info-button')
        .attr('data-place-id', placeDataId)
        .html('More Info');
      var infoButtonColumn = $('<div>').addClass('col-xs-6 col-sm-6 col-md-4 col-md-offset-1 col-lg-4 col-lg-offset-1').append(infoButton);
      var buttonRow = $('<div>').addClass('row button-row').append(reviewButtonColumn);
      buttonRow.append(infoButtonColumn);

      //Dynamically add content to columns
      var firstColumn = $('<div>')
        .addClass('col-xs-12 col-sm-12 col-md-5 col-lg-5')
        .append(image);
      var secondColumn = $('<div>')
        .addClass('col-xs-12 col-sm-12 col-md-7 col-lg-7')
        .append(restaurantRow)
        .append(addressRow)
        .append(statusRow)
        .append(buttonRow);

      //Append all columns to panel
      var panel = $('<div>').addClass('panel panel-default');
      var panelBody = $('<div>').addClass('panel-body');
      var contentRow = $('<div>').addClass('row content-row');
      contentRow.append(firstColumn);
      contentRow.append(secondColumn);
      var contentPanelBody = panelBody.append(contentRow);
      var newPanel = panel.append(contentPanelBody);
      var panelContents = $('.main-column').append(newPanel);

    }

    $(document).on('click', '.review-button', function() {
      $('.review-body').empty();
      $('#reviewModal').modal();

      //Build URL for each Google location
      var placeURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg&placeid=';
      var placeId = $(this).attr('data-place-id');
      var placeEndPoint = placeURL + placeId;

      var reviews, review, user, reviewContainer, userContainer, blockquote, imageUrl, userImage;
      $.getJSON(placeEndPoint, function(placeData) {
        reviews = placeData.result.reviews;
        for (var i = 0; i < reviews.length; i++) {
          review = placeData.result.reviews[i].text;
          user = placeData.result.reviews[i].author_name;
          // imageUrl = placeData.result.reviews[i].profile_photo_url.split('').splice(2).join('');
          // userImage = $('<img>').attr('src', imageUrl);
          reviewContainer = $('<p>').addClass('review-text').html(review);
          userContainer = $('<footer><cite title="Source Title">' +  user + '</cite></footer>');
          blockquote = $('<blockquote>').addClass('blockquote-reverse').append(reviewContainer);
          blockquote.append(userContainer);
          $('.review-body').append(blockquote);
        }
      });
    });

    $(document).on('click', '.info-button', function() {
      $('tbody').empty();
      $('.phone-icon-col').empty();
      $('.phone-number-col').empty();
      $('.price-icon-col').empty();
      $('.price-col').empty();
      $('#infoModal').modal();

      //Build URL for each Google Location
      var placeURL = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCoy7UBpNXFlBQKUGDtNz0ZhkgYC2cpPkg&placeid=';
      var placeId = $(this).attr('data-place-id');
      var placeEndPoint = placeURL + placeId;

      $.getJSON(placeEndPoint, function(placeData) {
        //Find phone number and append to modal
        var phoneNumber = placeData.result.formatted_phone_number;
        var phoneHeading = $('<h4>').html(phoneNumber);
        var phoneIcon = '<i class="fa fa-phone fa-3x"></i>';
        $('.phone-icon-col').append(phoneIcon);
        $('.phone-number-col').append(phoneHeading);

        //Find price level and append to modal
        var price = placeData.result.price_level;
        console.log(price);
        if (price === undefined) {
          price = 'N/A';
        }
        var priceHeading = $('<h4>').html('Price Level: ' + price);
        var priceIcon = '<i class="fa fa-usd fa-3x"></i>';
        $('.price-icon-col').append(priceIcon);
        $('.price-col').append(priceHeading);

        //Fetch weekday opening/closing hours and append to modal
        var weekdayText = placeData.result.opening_hours.weekday_text;
        var weekdayHours, weekdayRow;
        for (var i = 0; i < weekdayText.length; i++) {
          weekdayHours = $('<td>').html(weekdayText[i]);
          weekdayRow = $('<tr>').append(weekdayHours);
          $('tbody').append(weekdayRow);
        }
      });
    });
}


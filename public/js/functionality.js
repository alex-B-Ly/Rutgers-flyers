$(document).ready(function() {
  
  // REGISTER VALIDATION
  function validateRegister(){
    var nameFlag, emailFlag, usernameFlag, passwordFlag;

    function validCheck(){
      if(nameFlag === true && emailFlag === true && usernameFlag === true && passwordFlag === true){
        $('.reg-button').prop("disabled", false);
      }
    }

    function regNameValid(){
      if($('#reg-fname').val().length < 1 || $('#reg-lname').val().length < 1){
        $('.reg-error').text('You must enter a valid name');        
        nameFlag = false;
        validCheck();
      }else{
        $('.reg-error').empty();
        nameFlag = true;
        console.log('nameFlag is ',nameFlag);
        validCheck();
      }
    }

    function regEmailValid(){
      var emailInput = $('#reg-email').val();
      
      if(emailInput.length > 0 && (!emailInput.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))){
        $('.reg-error').text('Please enter a valid email');
        emailFlag = false;
        validCheck();
      }else if(emailInput.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)){
        $('.reg-error').empty();
        emailFlag = true;
        console.log('emailFlag is ',emailFlag);
        validCheck();    
      }
    }

    function usernameValid(){
      var usernameInput = $('#reg-username').val();
      if(!usernameInput){
        $('.reg-error').text('You must choose a username.');
        usernameFlag = false;
        validCheck();
      }else if(usernameInput.length < 5){
        $('.reg-error').text('Your username must be at least 5 characters long.');
        usernameFlag = false;
        validCheck();
      }else{
        $('.reg-error').empty();
        usernameFlag = true;
        console.log('usernameFlag is ',usernameFlag);
        validCheck();
      }
    }

    function passwordValid(){
      var password = $('#reg-password').val();
      var rePass = $('#reg-repass').val();

      if(rePass !== password){
        $('.reg-error').text('Your passwords don\'t match.');
        passwordFlag = false;
        validCheck();
      }else{
        $('.reg-error').empty();
        passwordFlag = true;
        console.log('passFlag is ',passwordFlag);
        validCheck();
      }
    }

    // Register validation functions binding
    $('#reg-fname').on('focusout', regNameValid);
    $('#reg-lname').on('focusout', regNameValid);
    $('#reg-email').on('focusout', regEmailValid);
    $('#reg-email').on('keyup', regEmailValid);
    $('#reg-username').on('focusout', usernameValid);
    $('#reg-username').on('keyup', usernameValid);
    $('#reg-repass').on('keyup', passwordValid);
  }

  // FUNCTIONS CALLED
  validateRegister();
});
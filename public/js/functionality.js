$(document).ready(function() {
  
  // REGISTER VALIDATION
  function validateRegister(){
    var nameFlag, emailFlag, passwordFlag;

    function regNameValid(){
      if($('#reg-fname').val().length < 1 || $('#reg-lname').val().length < 1){
        $('.reg-error').text('You must enter a valid name');
        $('.reg-button').prop("disabled", true);
        nameFlag = false;
      }else{
        $('.reg-error').empty();
        nameFlag = true;
      }
    }

    function regEmailValid(){
      var emailInput = $('#reg-email').val();
      
      if(emailInput.length > 0 && (!emailInput.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))){
        $('.reg-error').text('Please enter a valid email');
        emailFlag = false;
      }
    }

    function regEmailKeyup(){
      if(emailInput.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)){
        $('.reg-error').empty();
        emailFlag = true;
        console.log(emailFlag);
      }
    }

    function passwordValid(){
      var password = $('#reg-password').val();
      var rePass = $('#reg-repass').val();

      if(rePass !== password){
        $('.reg-error').text('Your passwords don\'t match.');
        passwordFlag = false;
      }else{
        passwordFlag = true;
      }
    }

    // Register validation functions binding
    $('#reg-fname').on('focusout', regNameValid);
    $('#reg-lname').on('focusout', regNameValid);
    $('#reg-email').on('focusout', regEmailValid);
    $('#reg-email').on('keyup', regEmailKeyup);
    $('#reg-password').on('keyup', passwordValid);
    $('#reg-repass').on('keyup', passwordValid);
  }

  // FUNCTIONS CALLED
  validateRegister();
});
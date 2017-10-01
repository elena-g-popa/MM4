// progressively showing the cards on the home page

$(document).ready(function(){
	$(".card").hide();
	$(".card:nth-of-type(1)").delay(1000).fadeIn(1000);
	$(".card:nth-of-type(2)").delay(3000).fadeIn(1000);
	$(".card:nth-of-type(3)").delay(5000).fadeIn(1000);

	var dialog, form;
	// Use JQuery UI to generate a dialog form behaviour
	dialog = $( "#dialogForm" ).dialog({
		autoOpen: false,
		fluid: true,
		modal: true,
		close: function() {
        	form[ 0 ].reset();
      	}
    });

	/**
	*
	* Check if the length of the input is between 4 and 512 characters
	*
	* @returns boolean
	*
	**/
	function checkLength(input) {
		var regex =/^[a-zA-Z\s]{4,512}$/;
		if (!regex.test(input.val())) {
			addErrorMessage( input,  "Length of '" + input.attr('placeholder') + "' must be between 4 and 512." );
			return false;
	  	} else {
			addSuccess(input);
		}
		return true;
    }

	/**
	*
	* Check if the email has the right format
	*
	* @returns boolean
	*
	**/
	function checkEmail(input) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test(input.val())) {
  		  	addErrorMessage( input, "Email is not valid." );
			return false;
		} else {
			addSuccess(input);
		}
		return true;
	}

	/**
	*
	* Check if the birthdate is the right format
	*
	* @returns boolean
	*
	**/
	function checkBirthday(input) {
		var replacement = input.val().replace('/','0');
		// Check if all the characters in the input are digits
   		var check = /^[0-9]+$/;
		if(!check.test(replacement)) {
  		  	addErrorMessage( input, "Birthdate is not valid." );
			return false;
		} else {
			addSuccess(input);
		}
		return true;
	}

	/**
	*
	* Add error messages for form validation
	*
	**/
	function addErrorMessage(input, message) {
		// Remove success class if previouslly was filled correctly
		input.removeClass( "ui-state-success" );
		input.addClass( "ui-state-error" );
		var errorMessage = $("<p></p>").text(message);
		$(".formErrors").append(errorMessage);
	}
	
	function addSuccess(input) {
		input.removeClass( "ui-state-error" );
		input.addClass( "ui-state-success" );
	}

	/**
	*
	* Remove all error messages
	*
	**/
	function removeErrorMessages() {
		$(".formErrors").html('');
	}

	function sendEmail() {
		// Remove previous error messages
		removeErrorMessages();
		
		var valid = true;
		var firstName = $("#firstName");
		var lastName = $("#lastName");
		var email = $("#email");
		var birthdate = $("#birthdate");


		/**
		*
		* Check if the length of the first name is correct
		* Check if the length of the last name is correct
		* Check if the email has the right format
		* Check if the birthdate is valid
		*
		* In case one returns false you want to check further in order to
		* display all the error messages at once
		*
		**/
		valid = checkLength(firstName);
		valid = checkLength(lastName) && valid;
		valid = checkEmail(email) && valid;
		valid = checkBirthday(birthdate) && valid;

		// Save data in JSON format if form is valid
		if (valid) {
			contactData = {firstname: firstName.val(), lastname: lastName.val(), email: email.val(), birthdate: birthdate.val()};
			console.log(contactData);
		}

		return valid;
	}

	// On submit prevent default behaviour and validate form before sending data further
	form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
	  sendEmail();
    });

	// Open dialog box
	$( "#signUp" ).button().on( "click", function() {
      dialog.dialog( "open" ).next(".ui-widget-overlay");
    });
});

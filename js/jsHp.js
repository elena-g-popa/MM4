// progressively showing the cards on the home page

$(document).ready(function(){
	$(".card").hide();
	$(".card:nth-of-type(1)").delay(1000).fadeIn(1000);
	$(".card:nth-of-type(2)").delay(3000).fadeIn(1000);
	$(".card:nth-of-type(3)").delay(5000).fadeIn(1000);

	var dialog, form;

	

	dialog = $( "#dialog-form" ).dialog({
		autoOpen: false,
		fluid: true,
		modal: true,
		buttons: {
			"Sign up": function () {},
			Cancel: function() {
				dialog.dialog( "close" );
			}
      	},
		close: function() {
        	form[ 0 ].reset();
      	}
    });

	form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
    });

	$( "#sign-up" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });
});

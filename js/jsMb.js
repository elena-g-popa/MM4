$(document).ready(function(){
	$(".listing h2").mouseover(function(){
		$(this).css({
			"cursor": "pointer"
		});
	});

	$(".listing p").hide();

	$(".listing h2").on("click", function(e){
		$(this).parent().children().filter("p").slideUp(500);
		$(this).next().slideDown(500);
	});
});

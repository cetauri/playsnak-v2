(function( $ ){
    $.fn.extend({
        Segment: function ( ) {
			$(this).each(function (){
				var self = $(this);
				var onchange = self.attr('onchange');
				var wrapper = $("<div>",{class: "ui-segment"});
				$(this).find("option").each(function (){
					var option = $("<span>",{class: 'option',onclick:onchange,text: $(this).text(),value: $(this).val()});
					if ($(this).is(":selected")){
						option.addClass("active");
					}
					wrapper.append(option);
				});
				wrapper.find("span.option").click(function (){
					wrapper.find("span.option").removeClass("active");
					$(this).addClass("active");
					self.val($(this).attr('value'));

						console.log($(this).text());
						changeText();

				});
				$(this).after(wrapper);
				$(this).hide();
			});
        }
    });
})(jQuery);


function changeText() {

	var jsonResponse = null;
	$.ajax({
	    contentType: 'application/json',
	    dataType: 'json',
		url: "/lang/ko.json",
		type: "GET",
		success: function(response) {
			console.log(response);

			try{
				$(".playanak-text").each(function(){
					var text = $(this).text();
					if (text != ""){
						console.log(text);	
						$(this).text(response[text]);
					}
				});	
			}catch (e){
				console.log(e);
			}

		}
	}).done(function() {
		// email.val("");
	  	// alert("Thank you! :)");
	}).fail(function() {
	    // alert( "error" );
	})

}
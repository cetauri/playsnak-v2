var form = $( "#myform" );


$('.nav li').click(function() {
	$(this).siblings('li').removeClass('active');
	// $(this).siblings('li').removeClass('active');
    $(this).addClass('active');
});



$( document ).ready(function() {
	form.validate();
    console.log( "document loaded" );
   $(".segment-select").Segment();
});

$( "#btnSubscribe" ).click(function() {
	$( "#btnSubscribe" ).blur();

	// https://jqueryvalidation.org/
	if (!form.valid()){
		return;
	}
	
	var email = $("#subscribeInputEmail");
	if(email.val() == ""){
		email.focus();
		alert("Please enter a valid email address.");
		return;
	}

	$.ajax({

	  url: "https://script.google.com/macros/s/AKfycbyejp2Gj0Rnjtsp-Tl_XdZk0GH87lQda4FOoKKfudYSxv_7vUlF/exec",
	  data: {
	  	email:email.val()
	  },
	  type: "POST"
	}).done(function() {
	  alert("Thank you! :)");
	}).fail(function() {
	    alert( "error" );
	})

	// alert(":) valid email : " + email.val());
});

function myMap() {

  var playsnak_positon = {lat: 52.512930, lng: 13.316290};
  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 15,
    center: playsnak_positon,
    scrollwheel: false,
    draggable: false
  });

  var contentString = '<strong>Playsnak GmbH</strong><br/>Bismarckstr. 10, 10625, Germany';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: playsnak_positon,
    map: map,
    icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    title: 'Playsnak GmbH'
  });

  marker.addListener('click', function() {
	// infowindow.open(map, marker);
	map.setCenter(marker.getPosition());
  });

  infowindow.open(map,marker);
}

$(function() {
	
	// Cache the Window object
	var $window = $(window);
	
	// Parallax Backgrounds
	// Tutorial: http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641
	
	$('section[data-type="background"]').each(function(){
		var $bgobj = $(this); // assigning the object
		
		$(window).scroll(function() {
		
			// Scroll the background at var speed
			// the yPos is a negative value because we're scrolling it UP!								
			var yPos = -($window.scrollTop() / $bgobj.data('speed'));
			
			// Put together our final background position
			var coords = '50% '+ yPos + 'px';
			console.log(coords);
			console.log($bgobj);
			// Move the background
			$bgobj.css({ backgroundPosition: coords });
			
		}); // end window scroll
	});
	
});


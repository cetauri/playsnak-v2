var form = $( "#myform" );

window.onload = function () {
	blogHeightNormalization()
}

$( document ).ready(function() {
	form.validate();

	$(".segment-select").Segment();
	
	$('.nav li').click(function() {
		$(this).siblings('li').removeClass('active');
		// $(this).siblings('li').removeClass('active');
	    $(this).addClass('active');
	});

	getJobsList();
	getBlogList();
	getBlogList();

	$(window).on('resize', function(){
		blogHeightNormalization();
		myMap();
	});

});

function blogHeightNormalization() {
	var maxHeight = 0;
	$(".blog-background").each(function(){
		if (maxHeight < $(this).height()){
			maxHeight = $(this).height();
		}
	});

	function updateHeight() {
		$(".blog-background").each(function(){
			$(this).height(maxHeight);
		});
	}

	setTimeout(updateHeight, 1000);
}

function getBlogList() {
	$.getJSON( "http://blog.playsnak.com/?json=get_tag_posts&tag_slug=news&count=20", function( data ) {
		$.each( data, function( key, val ) {
  			if ( key == "posts") {
				for ( var i = 0; i < val.length; i++ ) {

					var title = val[i].title_plain;
					var content = val[i].excerpt;
					var link = val[i].url;
					var categories = val[i].categories;
					var category = categories[0].title;
					var type = val[i].type;
					var published = moment(val[i].date).format('ll');
					published += ", " + category
					
					// TBW, TODO, XXX 고치자 
					var types = ["news", "game", "event"];
					type = types[i%3];


					$('#blog-list').append(
						$('<div>').attr('class', 'col-lg-3 col-md-4 col-sm-6 col-xs-12 blog-table').append(
							$('<div>').attr('class', 'blog-background').append(
								$('<img>').attr('class', 'blog-icon').attr('src', 'assets/img/icon_' + type + '.png')
							).append(
								$('<img>').attr('class', 'blog-image').attr('src', 'assets/img/blog_smallimage0' + (parseInt(i)+1) + '.png')
							).append(
								$('<div>').attr('class', 'blog-cell').append(
									$('<div>').attr('class', 'blog-date').append(published)
								).append(
									$('<div>').attr('class', 'blog-title blue-text').append(
										
										$('<a>').attr('href', link).append(title)
									)
								).append(
									$('<div>').attr('class', 'blog-body').append(content)
								).append(
									$('<div>').append(
										$('<a>').attr('class', 'blog-link').attr('href', link).append("Read more >")
									)
								)
							)
						)
					);
				}	  				
  			}
		})


	});
}
function getJobsList() {

	$.getJSON( "http://blog.playsnak.com/?json=get_tag_posts&tag_slug=jobs&count=7", function( data ) {
		$.each( data, function( key, val ) {
  			if ( key == "posts") {
				for ( var i = 0; i < val.length; i++ ) {

					var jobtitle = val[i].title;
					var joblink = val[i].url;
	
					$('.jobs-list').append(
						$('<li>').append(
							$('<a>').attr('href', val[i].url).append(jobtitle + "&nbsp;")
						).append(
							$('<button>').attr('class', 'btn btn-default btn-round-xs btn-xs').attr('formaction', joblink).attr('type', "submit").append("Apply Now")
						)
					);
				}	  				
  			}
		})
	});
}

$( "#btnSubscribe" ).click(function() {
	$( "#btnSubscribe" ).blur();

	// https://jqueryvalidation.org/
	if (!form.valid()){
		// http://t4t5.github.io/sweetalert/
		sweetAlert("Oops...", "Email Address in invalid format", "error");
		return;
	}
	
	var email = $("#subscribeInputEmail");
	if(email.val() == ""){
		email.focus();
		sweetAlert("Oops...", "Please enter a valid email address!", "error");
		return;
	}

	$.ajax({
	  url: "https://script.google.com/macros/s/AKfycbyejp2Gj0Rnjtsp-Tl_XdZk0GH87lQda4FOoKKfudYSxv_7vUlF/exec",
	  data: {
	  	Email:email.val()
	  },
	  type: "POST"
	}).done(function() {
		email.val("");
	  	swal("Good job!", "Your form has been submitted.", "success")
	}).fail(function() {
	    alert( "something wrong!" );
	})
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


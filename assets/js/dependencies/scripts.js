$(document).ready(function(){
  $('body').animate({'opacity':'+=1'}, 500);

  // Activate JQuery Push Menu
  $('.toggle-menu').jPushMenu({closeOnClickLink: false});
  $('.dropdown-toggle').dropdown();

  // Animate Hamburger Icon
  $(".navbar-toggle").on("click", function () {
    $(this).toggleClass("active");
  });

  // Contact form validation JS
  $("#contact-form").validate({
        // Specify the validation rules
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            message: "required"
        },
        
        // Specify the validation error messages
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name",
            email: "Please enter a valid email address",
            agree: "Please accept our policy"
        }
    });
});

$('.trigger-contact').click(function(e) {
  e.preventDefault();

  // Hide main scroll bar
  $("body").css("overflow", "hidden");

  // Set default hight of lightbox when the screen is small
  if ($(window).width() <= 767) {
    $('.contact-me').height($(window).height());
  }
  $('.navbar-toggle').trigger('click');

  // Animate and position element to the center while
  // retaining the scroll position.
	var offset = $(document).scrollTop();
	$('.contact-me').css({
    'top': offset + 1000,
    'display':'block'
  });

  // Reveal Lightbox
	$('.contact-me').animate({
		'top': '-=1000'
	}, function() { // Runs after animation
		$('.contact-me').css({
			'position': 'fixed',
			'top': 0
		});
    $('.contact-me .options').css({'position': 'absolute'});
	});

  // Hide Lightbox
  $('.close-contact').click(function(e) {
    e.preventDefault();
    $('.contact-me .options').css({'position': 'static'});
    $('.contact-me').animate({
      'top': '+=1000'
    }, function() {
      $('.contact-me').hide();
      $('.contact-me').css({
        'position': 'absolute',
        'top': 0
      });
    });
    $("body").css("overflow", "auto");
  });
});

function closeThankyou() {
  $('.thankyou').fadeOut(function() {
    $('.thankyou').css({'display':'none'});
  });
}
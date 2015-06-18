// Run when lightbox activates
$('.trigger-lightbox').click(function(e) {

  e.preventDefault();

  // Hide main scroll bar
  $("body").css("overflow", "hidden");

  // Set default hight of lightbox when the screen is small
  if ($(window).width() <= 767) {
    $('.lightbox').height($(window).height());
  }

  // Set Lightbox image source
  var imagesrcLarge = $(this).attr('href');
  var currentSlide = 1;
  if (imagesrcLarge.split('_').length > 1) {
    var sourceSplit = imagesrcLarge.split('_');
    var imagesrc = sourceSplit[0];
    var totalImages = sourceSplit[1].split('.')[0];
    $('.lightbox .current').text(currentSlide);
    $('.lightbox .total').text(totalImages);
    $('.lightbox .preview-container img').attr('src', imagesrc + '_1.jpg');

    if (totalImages > 1) {
      // Function for toggling the next and previous slides
      $('.slideleft').click(function() {
        if (currentSlide >= 1) {
          currentSlide--;
          if (currentSlide == 0) {
            currentSlide = totalImages;
          }
        } 
        $('.lightbox .current').text(currentSlide);
        $('.lightbox .preview-container').html('<img src="' + imagesrc + '_' + currentSlide + '.jpg" id="rotatingElement" class="draggable" style="display:none" />');
        $('.lightbox .preview-container .draggable').fadeIn(1000);
      });
      $('.slideright').click(function() {
        if (currentSlide <= totalImages) {
          currentSlide++; 
          if (currentSlide > totalImages) {
            currentSlide = 1;
          }
        }
        $('.lightbox .current').text(currentSlide);
        $('.lightbox .preview-container').html('<img src="' + imagesrc + '_' + currentSlide + '.jpg" id="rotatingElement" class="draggable" style="display:none" />');
        $('.lightbox .preview-container .draggable').fadeIn(1000);
      });
    } else {
      $('.lightbox .preview-container img').attr('src', imagesrcLarge);
      $('.slideleft').css({'display':'none'});
      $('.slideright').css({'display':'none'});
    }
  } else {
    $('.lightbox .preview-container img').attr('src', imagesrcLarge);
    $('.slideleft').css({'display':'none'});
    $('.slideright').css({'display':'none'});
  }
  $('.slide-title').text($(this).attr('data-title'));

  // Animate and position element to the center while
  // retaining the scroll position.
	var offset = $(document).scrollTop();
	$('.lightbox').css({
    'top': offset + 1000,
    'display':'block'
  });

  // Reveal Lightbox
	$('.lightbox').animate({
		'top': '-=1000'
	}, function() { // Runs after animation
		$('.lightbox').css({
			'position': 'fixed',
			'top': 0
		});
    $('.lightbox .options').css({'position': 'fixed'});
    $('.lightbox .slideleft span').animate({'opacity':'+=0.9'}, 1000);
    $('.lightbox .slideright span').animate({'opacity':'+=0.9'}, 1000);
    setTimeout(function() {
      $('.lightbox .slideleft span').animate({'opacity':'-=0.9'}, 1000);
      $('.lightbox .slideright span').animate({'opacity':'-=0.9'}, 1000);
    }, 3000);
	});

  // Show notification
  $('.lightbox .notification').animate({'opacity':'+=1'}, 1000);
  $('.notification').click(function() {
    $(this).fadeOut();
  });
  setTimeout(function() { $('.notification').fadeOut(); }, 3000);
});

// Hide Lightbox
$('.close-lightbox').click(function(e) {
	e.preventDefault();
  $('.lightbox .slideleft span').css({'opacity':'0'});
  $('.lightbox .slideright span').css({'opacity':'0'});
  $('.lightbox .options').css({'position': 'absolute'});
	$('.lightbox').animate({
		'top': '+=1000'
	}, function() {
		$('.lightbox').hide();
    $('.lightbox').css({
      'position': 'absolute',
      'top': 0
    });
    $('.slideleft').css({'display':'table'});
    $('.slideright').css({'display':'table'});
    $('.lightbox .current').text(1);
    $('.lightbox .total').text(1);
    $('.lightbox .preview-container img').attr('src',　'#');
    // Reset draggable element's position on close
    $('.draggable').css({
      'transform':'translate(0, 0)',
      '-webkit-transform':'translate(0, 0)'
    });
    $('.draggable').attr('data-x', '0');
    $('.draggable').attr('data-y', '0');
    $('.draggable').removeClass('large');
	});
  $("body").css("overflow", "auto");
});

/*
$('.lightbox .preview-container img').click(function(e) {
  $(this).toggleClass('large');
});
*/

/* =================================

   Make elements draggable

================================= */

// target elements with the "draggable" class
interact('.draggable').draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  restrict: {
    restriction: "self",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {
    var textEl = event.target.querySelector('p');

    textEl && (textEl.textContent =
      'moved a distance of '
      + (Math.sqrt(event.dx * event.dx +
                   event.dy * event.dy)|0) + 'px');
  }
});

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing demo
window.dragMoveListener = dragMoveListener;


/* =================================

  Enlarges element after a "tap"
   
================================= */
interact('.draggable').on('tap', function (event) {
  event.preventDefault();

  // The following resets the x, y data when the draggable element is clicked
  var target = event.target;
  // update the posiion attributes
  target.style.webkitTransform =
  target.style.transform =
    'translate(0px, 0px)';
  target.setAttribute('data-x', 0);
  target.setAttribute('data-y', 0);

  $(event.currentTarget).toggleClass('large');
});

/* =================================

  Enables Rotation

var angle = 0;

interact('#rotate-area').gesturable({
  onmove: function (event) {
    var rotatingElement = document.getElementById('rotatingElement');

    angle += event.da;

    rotatingElement.style.webkitTransform =
    rotatingElement.style.transform =
      'rotate(' + angle + 'deg)';
  }
});
   
================================= */
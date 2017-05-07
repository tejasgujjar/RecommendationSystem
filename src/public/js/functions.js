$('a.page-scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({

          scrollTop: target.offset().top - 40
        }, 900);
        return false;
      }
    }
  });

/*====================================
Show Menu on Book
======================================*/
$(window).bind('scroll', function() {
    var navHeight = $(window).height() - 800;
    if ($(window).scrollTop() > navHeight) {
      // console.log("loading header "+navHeight+", scrolltop: "+$(window).scrollTop());
        $('.navbar-default').addClass('on');
    } else {
        $('.navbar-default').removeClass('on');
    }
});

$('body').scrollspy({
    target: '.navbar-default',
    offset: 180
})

$(document).ready(function() {
  $("#team").owlCarousel({

      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      autoHeight : true,
      itemsCustom : [
            [0, 1],
            [450, 2],
            [600, 2],
            [700, 2],
            [1000, 4],
            [1200, 4],
            [1400, 4],
            [1600, 4]
          ],
  });

  $("#clients").owlCarousel({

      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      autoHeight : true,
      itemsCustom : [
            [0, 1],
            [450, 2],
            [600, 2],
            [700, 2],
            [1000, 4],
            [1200, 5],
            [1400, 5],
            [1600, 5]
          ],
  });

  $("#testimonial").owlCarousel({
    navigation : false, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true
    });

  $('#set_pref_btn').click(function(){
    $('#sign_up_form1').hide(300);
    $('#sign_up_form2').show(900);
    save_signup_details();
  });
  $('#signup-btn-from').click(function(){
    $('#loginModal').modal('hide');
  });
  $('#login-btn').click(function(){
    window.location.href = URL + "/home";
  });
  $('#btnDialog').click(function(){
    BootstrapDialog.alert('Loaded home page!');
  });
});

// Hello.
//
// This is The Scripts used for ___________ Theme
//
//
var USER_SIGNUP_INFO = null;
var HOST = "http://localhost";
var PORT = "3000"
var URL = HOST + ":" + PORT;
console.log("Application URL: "+URL);


function main() {

(function () {
   'use strict';

   /* ==============================================
  	Testimonial Slider
  	=============================================== */

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
      console.log("page scrolling");

        var navHeight = $(window).height() - 350;
        var videoHeight = $(window).height() - 750;
        if ($(window).scrollTop() > navHeight) {
          console.log("loading header "+navHeight+", scrolltop: "+$(window).scrollTop());
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
        if ($(window).scrollTop() > videoHeight) {
          console.log("loading videoHeight "+videoHeight+", scrolltop: "+$(window).scrollTop());
            $('.master-body').addClass('hide-body-content');
        } else {
            $('.master-body').removeClass('hide-body-content');
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

    function save_signup_details(){
      var firstname = $('#firstname').val();
      var lastname = $('#lastname').val();
      var street = $('#streetname').val();
      var city = $('#city').val();
      var country = $('#country').val();
      var zipcode = $('#zipcode').val();
      var email = $('#email').val();
      var contactno = $('#contactno').val();
      var password = $('#password').val();
      var confirm_password = $('#confirm_password').val();
      var address = {
        "streetname":streetname,
        "city":city,
        "country":country,
        "zipcode":zipcode,
      }
      USER_SIGNUP_INFO = {
        "firstname":firstname,
        "lastname":lastname,
        "password":password,
        "address":address,
        "contactno":contactno,
      }
    }

    function save_user_preferences(){
      var dishes = $("#dishes").val();
      dishes = dishes.split(",");
      var cuisine = $("#cuisine").val();
      USER_SIGNUP_INFO.dishes = dishes;
      USER_SIGNUP_INFO.cuisine = cuisine;
      register_user(USER_SIGNUP_INFO);
    }

    function register_user(data){
        // ajax request to save user info

    }

  	/*====================================
    Portfolio Isotope Filter
    ======================================*/
    $(window).load(function() {
        var $container = $('#lightbox');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });
  }());
}
main();

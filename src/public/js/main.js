// [BootstrapDialog.TYPE_DEFAULT,
//                      BootstrapDialog.TYPE_INFO,
//                      BootstrapDialog.TYPE_PRIMARY,
//                      BootstrapDialog.TYPE_SUCCESS,
//                      BootstrapDialog.TYPE_WARNING,
//                      BootstrapDialog.TYPE_DANGER];
var USER_SIGNUP_INFO = null;
var HOST = "http://localhost";
var PORT = "3000"
var URL = HOST + ":" + PORT;
console.log("Application URL: "+URL);

var LATITUDE = "";
var LONGITUDE = "";

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
      // console.log("page scrolling");

        var navHeight = $(window).height() - 350;
        var videoHeight = $(window).height() - 750;
        if ($(window).scrollTop() > navHeight) {
          // console.log("loading header "+navHeight+", scrolltop: "+$(window).scrollTop());
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
        if ($(window).scrollTop() > videoHeight) {
          // console.log("loading videoHeight "+videoHeight+", scrolltop: "+$(window).scrollTop());
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
      $( document ).ajaxStart(function() {
        console.log("starting ajax");
        $('#indicator-icon').show();
      });
      $( document ).ajaxStop(function() {
        console.log("stopping ajax");
        $('#indicator-icon').hide();
      });
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
      $('#signup-btn, #signup-btn-1').click(function() {
        save_user_preferences();
      });
      $('#back-signup').click(function(){
        $('#sign_up_form2').hide(500);
        $('#sign_up_form1').show(300);
        // BootstrapDialog.show({
        //        type: BootstrapDialog.TYPE_PRIMARY,
        //        title: 'Message type: ',
        //        message: 'What to do next?',
        //        buttons: [{
        //            label: 'I do nothing.'
        //        }]
        //    });

      });
      $('#signup-btn-from').click(function(){
        $('#loginModal').modal('hide');
      });
      $('#login-btn').click(function(){
        var email = $('#login_email').val();
        var password = $('#login_password').val();
        check_user_credential(email,password);

      });
      $('#btnDialog').click(function(){
        BootstrapDialog.alert('Loaded home page!');
      });
      getLocation();
  	});


    function check_user_credential(e,p){

      var post_data = {
        "email":e,
        "password":p,
        "latitude":LATITUDE,
        "longitude":LONGITUDE
      }

      $.ajax({
        url: '/api/rest/signinuser',
        type: 'post',
        data: post_data,
        success: function(data) {
            if(data.status == 200){
                console.log("User logged in successfully: "+data);
                window.location.href = "/home";
            }
            else if(data.status == 409){
                console.log('Invalid password');
                BootstrapDialog.alert({
                    title:"User log in failed!",
                    message:'Please check your login credentials and try again. ',
                    type: BootstrapDialog.TYPE_WARNING
                });
              }
        },
        error: function(data) {
            console.log('Failed to signup user');
            BootstrapDialog.alert({
                title:"Log in failed",
                message:'Server rejected the login request. Please try again later.',
                type: BootstrapDialog.TYPE_WARNING
            });
        }
      });
    }

    function save_signup_details(){
      var firstname = $('#firstname').val();
      var lastname = $('#lastname').val();
      var street = $('#streetname').val();
      var city = $('#city').val();
      var state = $('#state').val();
      var country = $('#country').val();
      var zipcode = $('#zipcode').val();
      var email = $('#email').val();
      var contactno = $('#contactno').val();
      var password = $('#password').val();
      var confirm_password = $('#confirm_password').val();

      USER_SIGNUP_INFO = {
        "firstname":firstname,
        "lastname":lastname,
        "password":password,
        "email":email,
        "streetname":street,
        "city":city,
        "state":state,
        "country":country,
        "zipcode":zipcode,
        "contactno":contactno
      }
    }

    function save_user_preferences(){
      var dishes = $("#dishes").val();
      dishes = dishes.split(",");
      var cuisine = $("#cuisines").val();
      var cuisines = cuisine.split(',');
      for(var i=0;i<cuisines.length; i++){
        cuisines[i] = cuisines[i].trim();
      }

      USER_SIGNUP_INFO.dishes = dishes;
      USER_SIGNUP_INFO.cuisines = cuisines;
      register_user(USER_SIGNUP_INFO);
    }

    function register_user(post_data){
        console.log("user sign up data: "+JSON.stringify(post_data));
        $.ajax({
          url: '/api/rest/signupuser',
          type: 'post',
          data: post_data,
          success: function(data) {
              if(data.status == 200){
                  console.log("Signed up successfully: "+data);
                  $('#loginModal').modal("show");
              }
              else if(data.status == 409){
                  console.log('User already exists');
                  BootstrapDialog.alert({
                      title:"Sign up failed!",
                      message:'User with email '+post_data.email+' already exists!',
                      type: BootstrapDialog.TYPE_WARNING
                  });
                }
          },
          error: function(data) {
              console.log('Failed to signup user');
              BootstrapDialog.alert({
                  title:"Sign up failed",
                  message:'Server rejected the signup request. Please try again later.',
                  type: BootstrapDialog.TYPE_WARNING
              });
          }
        });
    }

    function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          LATITUDE = "";
          LONGITUDE = "";
      }
    }

    function showPosition(position) {
      LATITUDE =  position.coords.latitude;
      LONGITUDE = position.coords.longitude;
      console.log("User location: "+LATITUDE +" lng:"+LONGITUDE);
    }
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                BootstrapDialog.alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                BootstrapDialog.alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                BootstrapDialog.alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                BootstrapDialog.alert("An unknown error occurred.");
                break;
        }
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

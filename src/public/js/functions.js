var USER_SIGNUP_INFO = null;
var HOST = "http://localhost";
var PORT = "3000"
var URL = HOST + ":" + PORT;
console.log("Application URL: "+URL);
var RECOMMENDATION_DATA = "";
var REST_OBJ = ""
$('a.page-scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      var id = this.hash;
      $(this.hash).show();
      if (id == "#tf-preferences"){
        alert("open preference");

        return false;
      }
      console.log("target "+target.id);
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
    var navHeight = $(window).height() * 0.3;
    if ($(window).scrollTop() > navHeight) {
      // console.log("loading header "+navHeight+", scrolltop: "+$(window).scrollTop());
        $('.navbar-default').addClass('on');
    } else {
        $('.navbar-default').removeClass('on');
    }
});

$('body').scrollspy({
    target: '.navbar-default',
    offset: 80
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

  $('#logout-btn').click(function(){
    BootstrapDialog.confirm({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            callback: function(result) {
                // result will be true if button was click, while it will be false if users close the dialog directly.
                if(result) {
                    logout_user();
                }else {

                }
            }
        });
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
  load_homepage_ajax();
  //$('#restaurantModal').modal('show');

  // $('#restaurant_list_div div.card.row').unbind();
  // $('#restaurant_list_div div.card.row').bind('click',function(e){
  //   console.log("view: "+e);
  // });
  // $('#restaurant_list_div .card .card-footer').unbind();
  // $('#restaurant_list_div .card .card-footer').bind('click',function(e){
  //   console.log("view: "+e);
  // });
  // $('#restaurant_list_div div').unbind();
  // $('#restaurant_list_div div').bind('click',function(e){
  //   console.log("view: "+e);
  // });

  $('#post_review_btn').click(function(){
    check_and_save_review();
  });

  $(function() {
    $('span.stars').stars();
});
});

function check_and_save_review(){
  var msg = $('#review_text').val();
  var rev_rating = $('#review_rating').val();
  console.log("review msg: "+msg);
  if (msg.trim() == ""){
    console.log("no msg");
    BootstrapDialog.alert({
            title: 'Post review',
            message: 'Please enter review.',
            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true // <-- Default value is false
        });
  }
  else{
    console.log("send ajax: "+msg);

    console.log("Rating:"+rev_rating);

    var post_data = {
      "restaurant_id":REST_OBJ.id,
      "review_msg":msg,
      "rating":rev_rating
    }
    $.ajax({
      url: '/api/postReview',
      type: 'post',
      data: post_data,
      success: function(data) {
          //console.log("Recommendation data: "+JSON.stringify(data));
          $('#restaurantModal').modal('hide');
      },
      error: function(data) {
        BootstrapDialog.alert({
                title: 'Post review',
                message: 'Unable to post review at this moment. Please try again later.',
                type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                closable: true // <-- Default value is false
            });
      }
    });
  }
}

function logout_user(){
  console.log("logged out");
  $.ajax({
    url: '/api/rest/signoutuser',
    type: 'get', // This is the default though, you don't actually need to always mention it
    success: function(data) {
        //console.log("Recommendation data: "+JSON.stringify(data));
        window.location.href = "/" ;
    },
    error: function(data) {
      BootstrapDialog.alert({
              title: 'Logout',
              message: 'Failed to logout. Please try again later',
              type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
              closable: true // <-- Default value is false
          });
    }
  });
}

function load_homepage_ajax(){
  $.ajax({
    // url: '/api/rest/getRestaurantsForProfileTemp',
    url: '/api/getRestaurantsForProfile',
    type: 'get', // This is the default though, you don't actually need to always mention it
    success: function(data) {
        //console.log("Recommendation data: "+JSON.stringify(data));
        if (data.status == 403){
          alert("Not logged in. Please login.");
          window.location.href = "/";
        }
        RECOMMENDATION_DATA = data;
        load_homepage(data);
    },
    error: function(data) {
        alert("Not logged in. Please login.");
        window.location.href = "/";
        console.log('Failed to get Recommendation data');
        if(data.status == 409){
            console.log('User already exists');
        }
    }
  });
}

function get_cuisines(cuisine_list){
  var ret = "";
  for(var i=0;i<cuisine_list.length;i++){
    if(i==0){
      ret = cuisine_list[i].title;
    }else{
      ret = ret + ", " + cuisine_list[i].title;
    }
  }
  return ret;
}

function load_homepage(main_data){
  console.log("loading homepage with data: "+main_data.length);
  var $img_url = "https://s3-media1.fl.yelpcdn.com/bphoto/lSZiyF5J_vCHlVYR_Yp7UQ/o.jpg";
  var $restaurant_name = "name";
  var $city = "San JOse"
  var $address = "address"
  var $rating = "4.5"
  var $review_count = "234"
  var $phone = "726487136"
  var $cusines = "mexi"
  var $id = "3";
  var dummySpace = "<div class='dummy-space-2'></div>";
  var restaurant_DOM = $('#restaurant_list_div');
  restaurant_DOM.html(" ");
  var data = "";
  for(var i=0;i<main_data.length;i++){
    data = main_data[i];
    $img_url = data.image_url;
    $restaurant_name = data.name;
    $city = data.location.city + ", " + data.location.state;
    $address = data.location.address1 + $city + data.location.country + ", " + data.location.zip_code;
    $rating = data.rating;
    $review_count = data.review_count;
    $phone = data.display_phone;
    $cusines = get_cuisines(data.categories);
    $id = data.id;
    var card_head = "<div id='r_"+ $id +"' class='card row'>" +
                       "<div class='row card-head'>" +
                          "<div class='col-md-2 restaurant-img'><img src='" + $img_url + "' alt='restaurant-img'></div>" +
                          "<div class='col-md-8 restaurant-name'><h2><strong>" + $restaurant_name + "</strong></h2>" +
                             "<p><small><strong>" + $city + "</strong></small></p><p class='margin-0'><small>" + $address +
                             "</small></p></div>" +
                          "<div class='col-md-2'><div class='rating-div'>" + $rating + "</div><small>" + $review_count +
                             " Reviews</small></div></div>";
    var card_body = "<div class='row card-body margin-0'><div class='restaurant-category'><label>Cusines:</label><p>" +
                     $cusines + "</p></div><div class='restaurant-category'><label>Phone:</label><p>" + $phone +
                     "</p></div></div>";
    var card_footer = "<div class='row card-footer'><button type='button' class='btn btn-default wdth-100 view-detail-btn' name='button'>View</button></div></div>";
    restaurant_DOM.append(card_head+card_body+card_footer);
  }
  restaurant_DOM.append(dummySpace);
  attach_card_events();
}

function parse_id(id){
  id = id.split('_');
  return id[1];
}

function attach_card_events(){
  $('.restaurant-img').unbind();
  $('.restaurant-img').bind('click',function(e){
    var id = this.parentElement.parentElement.id;
    show_restaurant_details(parse_id(id));
  });

  $('.view-detail-btn').unbind();
  $('.view-detail-btn').bind('click',function(e){
    console.log("view: "+e);
    var id = this.parentElement.parentElement.id;
    show_restaurant_details(parse_id(id));
  });
}

function get_selected_restaurant_object(id) {
  var obj = "";
  for(var i=0;i<RECOMMENDATION_DATA.length;i++){
      obj = RECOMMENDATION_DATA[i]
      if (obj.id == id){
        console.log("Selected id, got Obj of id: "+id);
        return obj;
      }
  }
  return false;
}

function show_restaurant_details(id){
  var obj = get_selected_restaurant_object(id);
  if (obj){
    REST_OBJ = obj;
    generate_post_div(obj);
    $('#restaurantModal').modal('show');
  }else{
    BootstrapDialog.alert({
            title: 'Post review',
            message: 'Failed to get restaurant details. Please try again',
            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true // <-- Default value is false
        });
  }

}

function generate_post_div(obj){
  var review_DOM = $('#review-body');
  review_DOM.html(" ");
  var reviews = obj.review;
  if (reviews == undefined){
    reviews = [];
    review_DOM.append("No reviews found for this restaurant");
  }
  var data = "";
  var $username = "";
  var $rating = "";
  var $review = "";
  for(var i=0;i<reviews.length;i++){
      data = reviews[i];
      $username = data.username;
      $rating = data.ratings;
      $review = data.comment;
      review_DOM.append("<div class='review'><div class='user-rating'><p><strong>"+$username +
      "</strong></p><span class='stars'>" + $rating + "</span></div><div>" + $review + "</div></div>");
    }
      $('span.stars').stars();
  }

$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

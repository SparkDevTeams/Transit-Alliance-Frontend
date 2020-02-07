


// check for resize events + setTimeout to economize use ------------
function resizeId(){

  $(window).on('resize', function(e) {

    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 350);
  });

}

// adds back to top button
function backToTop(){

  var lastScrollTop = 0;

  $(window).on('scroll' , function(e){

    var st = $(this).scrollTop();

       if (st > lastScrollTop){
           // downscroll code
           $('.back-to-top').removeClass('top-active');

       } else {
          // upscroll code
          if(st < 350) {

            $('.back-to-top').removeClass('top-active');
           } else {

              $('.back-to-top').addClass('top-active');
           };
       };

       lastScrollTop = st;
    });

}

// check screen width - assign height to mobile navigations / change order of global navigation elements ------------
function doneResizing(){

  var searchNav = $('#global-icon-search');
  var profileNav = $('#global-icon-profile');
  var siteNav = $('#mobile-main-site-nav');
  var absHeight = $('#main-container').height() - 52;


    if (window.innerWidth < '992'){


      searchNav.prependTo(searchNav.parent());
      profileNav.prependTo(profileNav.parent());



      // check for existence of site navigation on mobile views
      if (!$('.mobile-nav-container-site').length) {

        $('#main-container').addClass('no-site-nav');
        console.log('no site navigation');
      } else {

        siteNav.prependTo(siteNav.parent());
      }

      // turn OFF bootstrap dropdown on mobile views
      $('#global-icon-profile').removeClass('dropdown');
      $('#global-icon-profile a').removeAttr('data-toggle');
      $('#profile-sub').removeClass('dropdown-menu');

      // relocated dropdown markup outside global nav - addressess absolute position issues
      $('.global-sub').appendTo('.global-header-container .container');
      // relocated search markup outside global nav - addressess absolute position issues
      $('.global-search-container').appendTo('.global-header-container .container');

      // reset search when switching to smaller screen size - users same class for both views
      $('#main-container').removeClass('search-sub-active');

      // assign height to elements - 100% - 52px calculated via javascript to manage offset from top
      $('.global-nav-content, .mobile-nav-bg, .mobile-nav-container-site, .mobile-nav-container').height(absHeight);

    } else {

      searchNav.appendTo(searchNav.parent());
      profileNav.appendTo(profileNav.parent());


      // turn ON bootstrap dropdown (profile) in case of screen size change
      $('#global-icon-profile').addClass('dropdown');
      $('#global-icon-profile > a').attr('data-toggle','dropdown');
      $('#profile-sub').addClass('dropdown-menu');

      // relocated dropdown markup back into global profile list item
      $('.global-sub').appendTo('#global-icon-profile');
      // relocated search markup back into global search list item
      $('.global-search-container').appendTo('#global-icon-search');


      // reset mobile menu when switching to larger screen size
      $('#main-container').removeClass('mobile-active');
      $('#main-container').removeClass('profile-sub-active');
      $('#main-container').removeClass('search-sub-active');
      $('#mobile-menu-bars').removeClass('open');

      // remove height from elements when not mobile
      $('.global-nav-content, .mobile-nav-bg, .mobile-nav-container-site, .mobile-nav-container').css('height','');
    };
}


// animation for the page navigation
function pageNavAnimate(e){

  e.preventDefault();
  var section = $(this).attr("href");

  $("html, body").animate({
    scrollTop: $(section).offset().top - 120
  });

}

/******************* DOCUMENT READY *******************/


$(document).ready(function() {

  // apply current year to footer copyright
  $('#footer-current-year').text(new Date().getFullYear());

  // mobile menu trigger
  $('#mobile-menu-bars').on('click', function(){

    $(this).toggleClass('open');
    $('#main-container').toggleClass('mobile-active');

    // reset main container when menu closed
    if (!$('#main-container').hasClass('mobile-active')){
      $('#main-container').removeClass('profile-sub-active');
      $('#main-container').removeClass('search-sub-active');
    };

  });


  // capture click on profile icon - check width again in case of screen size change
  $('#profile-links').on('click',function(e){
    if (window.innerWidth < '992') {

      backToTop();

      $('#main-container').removeClass('search-sub-active');

      $('#main-container').toggleClass('profile-sub-active');
      e.preventDefault();
    } else {
      return true;
    }

  });

  // capture click on search icon - check width again in case of screen size change
  $('#global-icon-search a').on('click',function(e){

      $('#main-container').removeClass('profile-sub-active');

      $('#main-container').toggleClass('search-sub-active');

      // handle focus of search input
      if ($('#main-container').hasClass('search-sub-active')) {
        // set timeout doesn't seem to be working on mobile !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        setTimeout(function(){searchFocus()},600);
      } else {
        $('#search-query').blur();
      };

      e.preventDefault();
  });

  function searchFocus(){
    $('#search-query').focus()
  }

  // capture feedback click - footer
  function feedbackClick(){
    $("#feedback-survey-link").on('click', function(e){

      window.open("http://feedback.miamidade.gov/Community/se.ashx?s=57F314581DBCF72C&title="+document.title+"&link="+ window.location.href)
      return false;
    });
  }


  // capture click to restore site menu
  $('.mobile-main-menu').on('click',function(e){

      $('#main-container').removeClass('profile-sub-active');
      $('#main-container').removeClass('search-sub-active');
      e.preventDefault();
  });


  // search functionality
  $("#search-query").keypress(function(e){
    if(e.which == 13 && e.target.value != ""){
      window.location = 'http://www.miamidade.gov/search/home.asp#gsc.tab=0&gsc.q=' + escape(e.target.value);
    }
  });

  $("#search-button").on('click', function(e){
      var value = $("#search-query").val();
      if(value)
        window.location = 'http://www.miamidade.gov/search/home.asp#gsc.tab=0&gsc.q=' + escape(value);
  });

  $('.back-to-top a').on('click', function(e){
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
  });


  // expand hit area for toggle switches ------------
  $('.toggle-container').on('click', function(){

    if ($(this).find('input').is('input:checked')) {

      $(this).find('input').prop('checked',false);

    } else {

      $(this).find('input').prop('checked',true);
    };

  });



/*
$(window).on('scroll' , function(e){

  var pageNavigation = $('.pageNavigationContainer-hidden');
  var windowTop = $(window).scrollTop();


if($('.pageNavigationContainer').length){
  if (windowTop > $('.pageNavigationContainer').offset().top) {
      pageNavigation.addClass('fixed');
  } else {
      pageNavigation.removeClass('fixed');
  };
}


});
*/


$('.pageNavigationContainer nav').find('a').click(pageNavAnimate);
$('.pageNavigationContainer-hidden nav').find('a').click(pageNavAnimate);



//Closes current open Tab on Portal once another is clicked
$('.portal-accordion__content').on('show.bs.collapse', function () {
    $('.portal-accordion__content .in').collapse('hide');
});



// scroll back to top
backToTop();

// check width and order global nav ------------
doneResizing()
// listen for resize event then fire doneResizing() ------------
resizeId();
// listen for feedback click - footer -----------
feedbackClick();

});
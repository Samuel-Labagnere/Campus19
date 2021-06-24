function extendHeader() {
  $("header").addClass("header-extend");
  $(".cross-btn").css("display", "block")
  $(".left-side-nav").css("display", "none")
  $("#link-to-cart").css("display", "none")
  $(".login").css("display", "none")
  $(".container").css("padding-top", "30vh")
  $(".homeheader").css("margin-top", "30vh")
  $("nav").css("padding-top", "15px")
  $("#nav-bar").css("justify-content", "center")
  $(".inputgroup").css("width", "40vw")
  $(".blur").css("display", "block")
  $(".home-container").css("padding", "0")
  $(".logged_in").css("display", "none")
  $("#search-bar").css("padding", "0 100px !important")
}

function reduceHeader() {
  $("header").removeClass("header-extend");
  $(".cross-btn").css("display", "none")
  $(".left-side-nav").css("display", "inline-block")
  $("#link-to-cart").css("display", "inline-block")
  $(".login").css("display", "flex")
  $("#nav-bar").css("justify-content", "")
  $(".container").css("padding-top", "0")
  $(".homeheader").css("margin-top", "")
  $("nav").css("padding-top", "0")
  $(".inputgroup").css("width", "210px")
  $(".blur").css("display", "none")
  $(".home-container").css("padding", "")
  $(".logged_in").css("display", "flex")
  $("#search-bar").css("padding", "0 100px !important")
}

function openBurger() {
  $(".burger-menu").css("display", "block")
}

function closeBurger() {
  $(".burger-menu").css("display", "")
}

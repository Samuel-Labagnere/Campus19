function extendHeader() {
  $("header").addClass("header-extend");
  $(".cross-btn").css("display", "block")
  $(".left-side-nav").css("display", "none")
  $("#link-to-cart").css("display", "none")
  $(".login").css("display", "none")
  $(".container").css("padding-top", "30vh")
  $("nav").css("padding-top", "15px")
  $("#nav-bar").css("justify-content", "center")
  $(".inputgroup").css("width", "40vw")
  $(".blur").css("display", "block")
}

function reduceHeader() {
  $("header").removeClass("header-extend");
  $(".cross-btn").css("display", "none")
  $(".left-side-nav").css("display", "inline-block")
  $("#link-to-cart").css("display", "inline-block")
  $(".login").css("display", "flex")
  $(".container").css("padding-top", "0")
  $("nav").css("padding-top", "0")
  $(".inputgroup").css("width", "210px")
  $(".blur").css("display", "none")
}

$(document).ready(function() {
  $(".cart-info").text("Panier")
})
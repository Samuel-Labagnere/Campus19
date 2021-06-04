$(document).ready(function(){
    var imgRotateInvers = document.querySelector('.imgRotateInvers');
    var slidebar_button = document.querySelector('.slidebar_button');
    var sidebar_hidden = document.querySelector('.sidebar_hidden');
    var sidebar_visible = document.querySelector('.sidebar_visible');

    var imgRotateInvers2 = document.querySelector('.imgRotateInvers2');
    var slidebar_button2 = document.querySelector('.slidebar_button2');
    var sidebar_hidden2 = document.querySelector('.sidebar_hidden2');
    var sidebar_visible2 = document.querySelector('.sidebar_visible2');


slidebar_button.onclick = function() {
    imgRotateInvers.classList.toggle('imgRotate');
    sidebar_hidden.classList.toggle('sidebar_visible');
}

 slidebar_button2.onclick = function() {
    imgRotateInvers2.classList.toggle('imgRotate2');
    sidebar_hidden2.classList.toggle('sidebar_visible2');
}
 }) 
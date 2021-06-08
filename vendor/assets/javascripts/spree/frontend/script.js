$(document).ready(function() {

    const header = document.querySelector('header')

    $(".custom_variants_display").each(function(){
        var arr = $(this).html().split(", ");
        var i;
        for(i = 0; i < arr.length; i++){
            $(this).after('<p class="p_cart">'+arr[i]+'</p>');
        }
        $(this).remove();
    });
});

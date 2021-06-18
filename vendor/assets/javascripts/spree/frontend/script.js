$(document).ready(function() {
    $('.category-home-left').hover(() => {
        $('.category-btn').first().css('background-color', '#ED5466')
    }, () => {
        $('.category-btn').first().css('background-color', '')
    })

    $('.category-home-right').hover(() => {
        $('.category-btn').last().css('background-color', '#ED5466')
    }, () => {
        $('.category-btn').last().css('background-color', '')
    })
})

//variantes custom
$(document).ready(function(){

    if($(".variant-description").length > 0){

        var lang = $(".locale").html();

        var variants = [];
        $(".variant-description").each(function(){
            var variantStr = $(this).html().trim();
            var variant = variantStr.split(", ");
            var last = variant[variant.length - 1];

            if(lang == "fr"){
                if((last.match(/: /g) || []).length == 2){
                    variant.splice(-1, 1);
                    variant = variant.concat(last.split(" et "));
                }
            }else if(lang == "en"){
                if(variant.length > 2){
                    variant[variant.length - 1] = last.substring(4);
                }
            }

            var variantObj = new Object();

            var i;
            for(i = 0; i < variant.length; i++){
                option = variant[i].split(": ");
                variantObj[option[0]] = option[1];
            }

            variants.push(variantObj);
        });

        var customVariantsDiv = document.createElement("div");
        customVariantsDiv.id = "product-custom-variants";
        $(customVariantsDiv).insertAfter("#product-variants");

        var labeled = [];
        var i = -1;
        variants.forEach(function(variant){
            for ([key, value] of Object.entries(variant)){
            
                if(!labeled.includes(key)){
                    i++;
                    labeled.push(key);

                    var label = document.createElement("label");
                    label.setAttribute("for", "option-type-" + i);
                    label.innerHTML = key;
        
                    var select = document.createElement("select");
                    select.id = "option-type-" + i;
                    select.setAttribute("class", "optionType-select")
        
                    customVariantsDiv.appendChild(label);
                    customVariantsDiv.appendChild(select);
        
                    var values = possibleValuesFor(key);
                    
                    values.forEach(function(value, index){
                        var option = document.createElement("option");
                        option.setAttribute("value", "option-value-" + index);
                        option.innerHTML = value;
                        select.appendChild(option);
                    });
                }
            }
        });

        var outOfStock = document.querySelector(".out-of-stock");
        if(outOfStock){
            customOutOfStock = outOfStock.cloneNode(true);
            $(customOutOfStock).addClass("custom");
            customVariantsDiv.appendChild(customOutOfStock);
        }
        

        $(".optionType-select").change(function(){

            var changedId = $(this).attr("id");

            var optionType = $("label[for=" + $(this).attr("id") + "]").html();
            var optionValue = $(this).children("option[value=" + $(this).val() + "]").html();
            
            var filtered = variants.filter(function(variant){
                return variant[optionType] == optionValue;
            });

            $(".optionType-select").each(function(){
                if($(this).attr("id") == changedId){
                    return false;
                }

                optionType = $("label[for=" + $(this).attr("id") + "]").html();
                optionValue = $(this).children("option[value=" + $(this).val() + "]").html();

                filtered = filtered.filter(function(variant){
                    return variant[optionType] == optionValue;
                });
            });

            var toChange = [];
    
            $(".optionType-select").each(function(){
                var disabled = false;
                if($(this).attr("id") != "option-type-0" && $(this).attr("id") != changedId){
                    disabled = true;
                    var optionType = $("label[for=" + $(this).attr("id") + "]").html();
                    $(this).children("option").each(function(){
                        var optionValue = $(this).html();
                        var valid = filtered.filter(function(variant){
                            return variant[optionType] == optionValue;
                        });
                        if(valid.length < 1){
                            $(this).attr("disabled", true);
                        }else{
                            disabled = false;
                            $(this).removeAttr("disabled");
                        }
                    });
                }
                if(!$(this).val()){
                    var toSelect = $(this).children('option:not([disabled])');
                    if(toSelect.length > 0){
                        $(this).val(toSelect.first().val());
                        toChange.push(this);
                    }
                }

                if(disabled){
                    $(this).attr("disabled", true);
                }else{
                    $(this).removeAttr("disabled");
                }
            });
            
            var myCurrentVariant = currentVariant();
            $('#product-variants li').each(function(){
                if($(this).find('.variant-description').html().trim() == myCurrentVariant){
                    $(this).find('input').click();
                    if($(this).find('.out-of-stock').length > 0){
                        $(".custom.out-of-stock").show();
                        $("#add-to-cart-button").prop('disabled', true);
                    }else{
                        $(".custom.out-of-stock").hide();
                        $("#add-to-cart-button").removeAttr("disabled");
                    }
                }
            });

            toChange.forEach(function(elem){
                $(elem).trigger("change");
            });
        });
    
        setTimeout(function(){
            $("#option-type-0").trigger("change");
        }, 1);

    }

    function possibleValuesFor(optionType){
        var values = [];

        var i;
        for(i = 0; i < variants.length; i++){
            if(typeof variants[i][optionType] != "undefined"){
                if(!values.includes(variants[i][optionType])){
                    values.push(variants[i][optionType]);
                }
            }
        }

        if(optionType == "Taille"){
            values.sort(function(a, b){
                var sizeToNum = function(size){
                    if(size == "XS"){
                        return 1;
                    }else if(size == "S"){
                        return 2;
                    }else if(size == "M"){
                        return 3;
                    }else if(size == "L"){
                        return 4;
                    }else if(size == "XL"){
                        return 5;
                    }else{
                        return 6;
                    }
                };
                return sizeToNum(a) - sizeToNum(b);
            });
        }

        return values;
    }

    function currentVariant(){
        var myVariant = new Object();

        $(".optionType-select").each(function(){
            var optionType = $("label[for=" + $(this).attr("id") + "]").html();
            var optionValue = $(this).children("option[value=" + $(this).val() + "]").html();
            
            myVariant[optionType] = optionValue;
        });

        for(key of Object.keys(myVariant)){
            if(typeof myVariant[key] == "undefined"){
                delete myVariant[key];
            }
        }

        return variantToString(myVariant);
    }

    function variantToString(variant){
        var str = "";
        var length = Object.keys(variant).length;
        var i = 0;
        for ([key, value] of Object.entries(variant)){
            if(length >= 3 && i == length - 1){
                if(lang == "fr"){
                    str = str + " et " + key + ": " + value;
                }else if(lang == "en"){
                    str = str + ", and " + key + ": " + value;
                }
            }else{
                str = str + ", " + key + ": " + value;
            }
            i++;
        }

        if(str.substring(0,2) == ", "){
            str = str.substring(2);
        }
        return str;
    }

});

//couleurs page tous produits
$(document).ready(function(){

    $(".shirt").each(function(){
        $(this).css("background-color", $(this).attr("data-color"));
    });
    

    $(".product-img").hide();

    $(".product-image").each(function(){
        $(this).find(".product-img").filter(function(){
            return $(this).children("img").length > 0;
        }).first().show();
    });

    $(".shirt").mouseover(function(){
        $(this).parents(".li-product-list").find(".product-img").hide();
        var classes = $(this).attr("class").split(/\s+/);
        var variantId = classes[classes.length -1];
        $(this).parents(".li-product-list").find(".product-img." + variantId).show();
    });

    $("div.colors").mouseleave(function(){
        $(this).parents(".li-product-list").find(".product-img").hide();
        $(this).parents(".li-product-list").find(".product-img").filter(function(index){
            return $(this).find("img").length > 0
        }).first().show();
    });
   
});
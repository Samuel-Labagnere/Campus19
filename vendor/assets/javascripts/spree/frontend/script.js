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

    if($(window).height() > ($('footer').position().top + 140)) {
        $('footer.container').css({"position": "absolute", "bottom": "0"})
    }
})

//variantes custom
$(document).ready(function(){

    if($(".variant-description").length > 0){

        var variants = [];
        $(".variant-description").each(function(){
            var variantStr = $(this).html().trim();
            variants.push(stringToVariant(variantStr));
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

    }

});

function variantToString(variant){
    var str = "";
    var length = Object.keys(variant).length;
    var i = 0;
    for ([key, value] of Object.entries(variant)){
        str = str + ", " + key + ": " + value;
        i++;
    }

    if(str.substring(0,2) == ", "){
        str = str.substring(2);
    }
    return str;
}

function stringToVariant(str){
    var variant = str.split(", ");

    var variantObj = new Object();

    var i;
    for(i = 0; i < variant.length; i++){
        option = variant[i].split(": ");
        variantObj[option[0]] = option[1];
    }

    return variantObj;
}

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

//filtres
$(document).ready(function(){

    if($(".details_list").length > 0){

        var productsFilter = new Object();
    
        $(".filterCheck").change(function(){
            $(".filterContainer").each(function(){
                var optionType = $(this).find(".title_summary").text().trim();
                var selected = new Array();
                $(this).find("input:checked").each(function(){
                    selected.push($(this).next("p").html());
                });
                productsFilter[optionType] = selected;
            });
    
            $(".li-product-list").hide();
    
            $(".li-product-list").filter(function(){
                var bool = false;
                $(this).find(".available-variant").each(function(){
                    var variant = stringToVariant($(this).html());
                    if(variantMatchesFilter(variant, productsFilter)){
                        bool = true;
                        return false;
                    }
                });
                return bool;
            }).show();
    
        });
    
        function variantMatchesFilter(variant, filter){
            for([optionType, values] of Object.entries(filter)){
                var i, bool = false;
    
                if(values.length === 0){
                    bool = true;
                }else{
                    for(i = 0; i < values.length; i++){
                        if(variant[optionType] === values[i]){
                            bool = true;
                            break;
                        }
                    }
                }
    
                if(!bool){
                    return false;
                }
            }
            return true;
        }
    
        var productsDOM = Array.from(document.querySelectorAll(".li-product-list"));
    
        $(".orderBy .check").change(function(){
            if(!$(this).is(":checked")){
                $(this).prop("checked", true);
            }else{
                var checked = this;
                $(".orderBy .check").filter(function(){
                    return this != checked;
                }).prop("checked", false);
    
                productsDOM.sort(function(a, b){
                    aNum = parseInt(a.id.substring(8));
                    bNum = parseInt(b.id.substring(8));
    
                    if(checked.id == "orderBy-new"){
                        return bNum - aNum;
                    }else{
                        aPrice = parseFloat($(a).find(".price.selling").attr("content"));
                        bPrice = parseFloat($(b).find(".price.selling").attr("content"));
        
                        if(checked.id == "orderBy-ascending"){
                            var diff = aPrice - bPrice;
                            if(diff === 0){
                                return bNum - aNum;
                            }else{
                                return diff;
                            }
                        }
        
                        if(checked.id == "orderBy-descending"){
                            var diff = bPrice - aPrice;
                            if(diff === 0){
                                return bNum - aNum;
                            }else{
                                return diff;
                            }
                        }
                    }
                });
    
                productsDOM.forEach(function(li, index){
                    $(".li-product-list").eq(index).before(li);
                });
            }
        });
        
    }

});

//click & collect
$(document).ready(function(){

    if($("#div_address_mode").length > 0){

        $('input[type=radio][name=address_mode]').change(function(){
            if (this.value == "collect"){
                $("#order_use_billing").prop('checked', false).trigger("change");
                $("[data-hook=shipping_inner] input, [data-hook=shipping_inner] select").prop('disabled', true);
                $(".hiddenAddress").prop('disabled', false);
                $("[data-hook=shipping_inner]").hide();
            }
            if (this.value == "idem") {
                $(".hiddenAddress").prop('disabled', true);
                $("[data-hook=shipping_inner]").show();
                $("[data-hook=shipping_inner] input, [data-hook=shipping_inner] select").prop('disabled', false);
                $("#order_use_billing").prop('checked', true).trigger("change");
            }
            if (this.value == "perso"){
                $(".hiddenAddress").prop('disabled', true);
                $("[data-hook=shipping_inner]").show();
                $("[data-hook=shipping_inner] input, [data-hook=shipping_inner] select").prop('disabled', false);
                $("#order_use_billing").prop('checked', false).trigger("change");
            }
        });

        $("input[type=radio][name=address_mode]:checked").trigger("change");

    }

    if($("#isClickAndCollect").length > 0){
        if($("#isClickAndCollect").attr("data-bool") === "true"){
            $("input[type=radio]").filter(function(){
                return $(this).parent().children(".rate-name").html() == "Click &amp; Collect";
            }).prop("checked", true);
            $(".continue[type=submit]").click();
        }else{
            $(".shipping-method").filter(function(){
                return $(this).find(".rate-name").html() == "Click &amp; Collect";
            }).hide();
            $("input[type=radio]").filter(function(){
                return $(this).parent().children(".rate-name").html() != "Click &amp; Collect";
            }).first().prop("checked", true);
        }
    }

});
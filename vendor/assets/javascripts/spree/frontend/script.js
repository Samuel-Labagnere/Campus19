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

        var variants = [];
        $(".variant-description").each(function(){
            var variantStr = $(this).html().trim();
            var variant = variantStr.split(", ");
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

        var i = -1;
        for ([key, value] of Object.entries(variants[0])){
            i++;

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

        $(".optionType-select").change(function(){
            var optionType = $("label[for=" + $(this).attr("id") + "]").html();
            var optionValue = $(this).children("option[value=" + $(this).val() + "]").html();
            
            var filtered = variants.filter(function(variant){
                return variant[optionType] == optionValue;
            });
    
            var changedId = $(this).attr("id");
    
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
                    // alert('Cpasbon');
                    var toSelect = $(this).children('option:not([disabled]):first').val();
                    $(this).val(toSelect);
                }
    
                if(disabled){
                    $(this).attr("disabled", true);
                }else{
                    $(this).removeAttr("disabled");
                }
            });
            var myCurrentVariant = currentVariant();
            $('#product-variants li').each(function(){
                var previous;
                if($(this).find('.variant-description').html().trim() == myCurrentVariant){
                    $(this).find('input').click();
                }
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

        return values;
    }

    function currentVariant(){
        var myVariant = new Object();

        $(".optionType-select").each(function(){
            var optionType = $("label[for=" + $(this).attr("id") + "]").html();
            var optionValue = $(this).children("option[value=" + $(this).val() + "]").html();
            
            myVariant[optionType] = optionValue;
        });
        
        var theVariant = variants.filter(function(variant){
            var pass = true;
            for ([key, value] of Object.entries(variant)){
                if(myVariant[key] != value){
                    pass = false;
                }
            }
            return pass;
        });

        return variantToString(theVariant[0]);
    }

    function variantToString(variant){
        var str = "";
        for ([key, value] of Object.entries(variant)){
            str = str + key + ": " + value + ", ";
        }
        return str.slice(0, -2);
    }

});
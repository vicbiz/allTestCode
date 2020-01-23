$().ready(function() {
    //$(".fhsSelect").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'});

    var config = {
        '.chosen-select'           : {enable_split_word_search:false, search_contains:true},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"95%"}
    };


    for (var selector in config) {
        if($(selector).length > 0){
            $(selector).chosen(config[selector]);
        }
    }





    $("#country").on("change", function(){
        var countryId = $(this).val();
        var $flatUiObj = $("select#adminArea");
        var $regionData = $("#regionData");

        if(countryId !== 'null' && countryId !== ''){
            $("#s2id_adminArea").hide();
            $regionData.hide();
            $("#ajaxMsg").remove();
            $flatUiObj.parent().append("<div id='ajaxMsg' class='loading'>Loading Data...</div>");

            $.ajax({
                type: 'GET',
                url: '/asset/ajaxStatesByCountry/'+countryId,
                dataType: 'json',
                success: function (data, textStatus) {
                    var html = '<option value="null">Select State</option>';
                    if(data.states.length > 0){
                        $.each(data.states, function(i) {
                            html += '<option value="'+data.states[i].id+'">'+data.states[i].name+'</option>';
                        });
                        $("select#adminArea option").remove();
                        $("select#adminArea").append(html);
                        $("#adminArea.fhsSelect").selectpicker("refresh");
                        $("#ajaxMsg").remove();
                        $("#s2id_adminArea").show();

                    } else {
                        $("select#adminArea option").remove();
                        $("select#adminArea").append('<option value="null" selected="selected">Select State</option>');
                        $("#ajaxMsg").removeClass('loading').addClass('noData').text("No Data available for this county");
                    }
                },
                error: function (xhr, err, e) {
                }
            });
        } else {
            $("select#adminArea option").remove();
            $("select#adminArea").append('<option value=""></option>');
            $("#adminArea.fhsSelect2").select2('destroy');
            $("#adminArea.fhsSelect2").select2({
                    placeholder: "Nothing Selected",
                    width: 300,
                    allowClear: true
            }
            );
        }

    });


    if($("#country").val() === 'null' || $("#country").val() === ''){
        $("select#adminArea option").remove();
        $("select#adminArea").append('<option value=""></option>');
        $("#adminArea.fhsSelect2").select2('destroy');
        $("#adminArea.fhsSelect2").select2({
                placeholder: "Nothing Selected",
                width: 300,
                allowClear: true
            }
        );
    }


    $("#region").on("change", function(){
        var regionyId = $(this).val();
        var $flatUiObj = $("select#subRegion");
        var $regionData = $("#regionData");
        var initVal = $("#subRegion").attr("data-initVal");

        if(regionyId !== 'null'){
            $("#s2id_subRegion").hide();
            $regionData.hide();
            $("#ajaxMsg").remove();
            $flatUiObj.parent().append("<div id='ajaxMsg' class='loading'>Loading Data...</div>");
            $.ajax({
                type: 'GET',
                url: '/asset/ajaxGetSubRegionsForRegion/'+regionyId,
                dataType: 'json',
                success: function (data, textStatus) {
                    var html = '<option value="null">Select Sub-Region</option>';
                    if(data.length > 0){
                        var haveInitVal = false;
                        $.each(data, function(i) {
                            var selected = "";
                            if(parseInt(initVal) === parseInt(data[i].id)){
                                haveInitVal = true;
                                selected = 'selected = "selected"';
                            }
                            html += '<option value="'+data[i].id+'" '+ selected +'>'+data[i].name+'</option>';
                        });
                        $("select#subRegion option").remove();
                        $("select#subRegion").append(html);
                        if(haveInitVal){
                            $("#subRegion.fhsSelect2").select2('destroy');
                            $("#subRegion.fhsSelect2").select2();
                        }
                        $("#ajaxMsg").remove();
                        $("#s2id_subRegion").show();

                        $regionData.text(data[0].region);
                        $regionData.show();

                    } else {
                        $("select#subRegion option").remove();
                        $("select#subRegion").append('<option value="null" selected="selected">Select Sub-Region</option>');
                        $("#ajaxMsg").removeClass('loading').addClass('noData').text("No Data available for this region");
                    }
                },
                error: function (xhr, err, e) {
                }
            });
        } else {
            $("select#subRegion option").remove();
            $("select#subRegion").append('<option value="null" selected="selected">Select Sub-Region</option>');
            $("#ajaxMsg").removeClass('loading').addClass('noData').text("No Data available for this region");
            $("#subRegion.fhsSelect2").select2('destroy');
            $("#subRegion.fhsSelect2").select2({
                placeholder: "Nothing Selected",
                width: 300,
                allowClear: true
            });
        }
    });

    if($("#region").val()){
        $("#region").trigger("change");
    }






    if($(".helpIcon").length > 0){
        $(".helpIcon:not(.disabled)").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Help";
            var modalContent = $($(this).attr("data-helpContent")).html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });
    }

});
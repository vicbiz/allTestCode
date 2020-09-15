$(document).ready(function() {
    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var oTable = $("#data").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumns": [
            null,
            null,
            null,
            null,
            {"sType": "percent"},
            {"sType": "percent"},
            {"sType": "percent"},
            {"sType": "percent"},
            null,
            null
        ],
        "aoColumnDefs": [
            {
                aTargets: [-1]
            }
        ],
        "aaSorting": []
    });

    $( "#startDate, #endDate" ).datepicker();
    $(".selectDateWrap button.calIcon").on("click", function(){
        var targetObj = $(this).attr("data-targetInput");
        $(targetObj).datepicker("show");
    });

    $("#evaluationType").on("change", function(){
        var selectedVal = $(this).val();
        if(selectedVal === "BRAND"){
            //oTable.fnFilter('',2);
            //oTable.fnFilter(selectedVal, 1);
            oTable.fnFilter('^(?!FTG).+', 2, true, false);
        } else {
            //oTable.fnFilter('',1);
            oTable.fnFilter(selectedVal, 2);
        }
    });

    var updateOnlyEE = function(){
        var onlyEE = $("#onlyEE").prop('checked');
        if(onlyEE){
            oTable.fnFilter("true", 9);
        } else {
            oTable.fnFilter("", 9);
        }
    }

    $("#onlyEE").on("change", function () {
        updateOnlyEE();
    });
    updateOnlyEE();






    $("#assetGroupId").select2({
        placeholder: "Select a Asset Group",
        width: 300,
        allowClear: true
    });

    var updateSelectTab = function(){
        var evalType = $("#evaluationTypeId").val();
        if(evalType === "null"){
            $(document).find("#selectSectionId button, #selectClassificationId button").addClass("disabled");
        } else {
            $(document).find("#selectSectionId button, #selectClassificationId button").removeClass("disabled");
        }
        var selectedTab = $("#secOrClassWrap input[name=secOrClass]:checked").val();
        $("#selectSectionId, #selectClassificationId").hide();
        $("#sectionId, #classificationId").val(0).change();
        $("#"+selectedTab).show();
    };

    var updateSections = function(){
        var assetType = $("#assetTypeId").val();
        var evalType = $("#evaluationTypeId").val();
        $(document).find("#selectSectionId button, #selectClassificationId button").addClass("disabled");
        if(evalType !== "null"){
            $.ajax( {
                type: "GET",
                url: "/report/sectionsByAssetTypeAndEvaluationType?assetTypeId="+assetType+"&evaluationTypeId="+evalType,
                success: function( response ) {
                    var html = '<option value="null" selected="selected">Select One</option>';
                    if(response.length < 1){
                        html = '<option value="null" selected="selected">No Data</option>';
                    } else {
                        html += '<option value="-1">All Sections</option>';
                        $.each(response, function(){
                            html += '<option value="'+this.id+'" >'+this.name+'</option>';
                        });
                    }
                    $("#sectionId").html(html);
                    $(document).find("#selectSectionId button").removeClass("disabled");
                    $("#sectionId").selectpicker('refresh');
                }
            });
            $.ajax( {
                type: "GET",
                url: "/report/classificationsByAssetTypeAndEvaluationType?assetTypeId="+assetType+"&evaluationTypeId="+evalType,
                success: function( response ) {
                    var html = '<option value="null" selected="selected">Select One</option>';
                    if(response.length < 1){
                        html = '<option value="null" selected="selected">No Data</option>';
                    } else {
                        html += '<option value="-1">All Classifications</option>';
                        $.each(response, function(){
                            html += '<option value="'+this.id+'" >'+this.name+'</option>';
                        });
                    }
                    $("#classificationId").html(html);
                    $(document).find("#selectClassificationId button").removeClass("disabled");
                    $("#classificationId").selectpicker('refresh');
                }
            });
        }
        else {
            $("#sectionId").html('<option value="null" selected="selected">Select One</option>');
            $("#sectionId").selectpicker('refresh');
        }

    };

    var updateEvalyType = function(){
        var assetType = $("#assetTypeId").val();
        var standardYear = $("#standardYearId>option:selected").text();

        if(assetType !== "" && standardYear !== ""){
            $(document).find("#selectCEvaluationTypeId button").addClass("disabled");
            $.ajax( {
                type: "GET",
                url: "/report/evaluationTypesByYear?year="+standardYear,
                success: function( response ) {
                    var html = '<option value="null" selected="selected">Select One</option>';
                    if(response.length < 1){
                        html = '<option value="null" selected="selected">No Data</option>';
                    } else {
                        $.each(response, function(){
                            html += '<option value="'+this.id+'" >'+this.name+'</option>';
                        });
                    }
                    $("#evaluationTypeId").html(html);
                    $(document).find("#selectCEvaluationTypeId button").removeClass("disabled");
                    $("#evaluationTypeId").selectpicker('refresh');
                    updateSections();
                }
            });
            $("#sectionOrClassification").show();
        } else {
            $("#evaluationTypeId").html('<option value="null" selected="selected">Select One</option>');
            $("#evaluationTypeId").selectpicker('refresh');
            $("#sectionOrClassification").hide();
        }

        updateSelectTab();
    };

    $("#assetGroupScoresReportFormWrap form #assetGroupId, #assetGroupScoresReportFormWrap form #assetTypeId, #assetGroupScoresReportFormWrap form #standardYearId").on("change", function(){
        updateEvalyType();
    });
    $("#evaluationTypeId").on("change", function(){
        updateSections();
    });
    $("#secOrClassWrap input[name=secOrClass]").on("change", function(){
        updateSelectTab();
    });
    updateEvalyType();


});

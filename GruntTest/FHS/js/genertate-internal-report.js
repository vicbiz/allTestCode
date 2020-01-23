$(document).ready(function () {


    var validateDateSelection = function(){
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        if(startDate === "" || endDate === "" ){
            $("#generateReport1 .errorMsg").html("Error : Please choose Start and End Date").removeClass("hidden");
            return false;
        } else {
            if(new Date(endDate).getTime() < new Date(startDate).getTime()){
                $("#startDate").removeClass("error").addClass("error");
                $("#generateReport1 .errorMsg").html("Error : Start date cannot be greater than End date").removeClass("hidden");
                return false;
            }
            else {
                return true;
            }
        }
    };

    if($(".selectDateWrap").length > 0){
        $("#startDate, #endDate").datepicker();
        $(".selectDateWrap button.calIcon").on("click", function () {
            var targetObj = $(this).attr("data-targetInput");
            $(targetObj).datepicker("show");
        });

        $("#generateReportSubmit").on("click", function(){
            return(validateDateSelection());
        });
    }











    var validationAssetId = function(){
        var foundInList = false;
        if($("#assetIdTypeAhead").val() === ""){
            $("#selectAssetIdWrap label").removeClass("error").addClass("error");
        } else {
            foundInList = true;
        }
        if(foundInList){
            $("#selectAssetIdWrap label").removeClass("error");
        } else {
            $("#selectAssetIdWrap label").removeClass("error").addClass("error");
        }
        return foundInList;
    };


    var validateEvaluationTypeId = function(){
        if($("#evaluationTypeId").val() === ""){
            $("#evaluationTypeWrap label").removeClass("error").addClass("error");
            return false;
        } else {
            $("#evaluationTypeWrap label").removeClass("error");
            return true;
        }
    };




    var updateEvaluationList = function(onLoad){
        $("#evaluationTypeId").selectpicker('destroy');
        $("#evaluationTypeWrap .btn-group.select").remove();
        $("#evaluationTypeWrap #evaluationTypeId").remove();
        $("#evaluationTypeWrap").append('<span id="loadingData">&nbsp;&nbsp;&nbsp;Loading Data ......</span>');

        var assetId = $("#assetId").val();
        var standardYearId = $("#standardYearId").val();
        var initVal = "";
        if(onLoad){
            initVal = $.urlParam("evaluationTypeId");
        }

        $.ajax( {
            type: "GET",
            url: "/evaluation/listEvaluationTypesForAssetScoreTrackingReport?assetId="+assetId+"&standardYearId="+standardYearId,
            success: function( response ) {

                var html = '<select id="evaluationTypeId" class="fhsSelect" data-evaluationtypeid="8" name="evaluationTypeId"><option value="">Select Evaluation Type</option>';
                for(var i=0; i<response.length; i++){
                    var selectedHtml = "";
                    if(response[i].id == initVal){
                        selectedHtml = "selected='selected'";
                    }
                    html += '<option value="'+response[i].id+'" '+ selectedHtml +'>'+response[i].name+'</option>';
                }
                html += '</select>';

                $("#loadingData").remove();
                $("#evaluationTypeWrap").append(html);
                $("#evaluationTypeId.fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

                updateSearchBtn();
            }
        } );
    };


    var updateAssetData = function(onLoad){
        var assetTypeId = $("#assetTypeId").val();
        $.ajax( {
            type: "GET",
            url: "/asset/selectOptionsByType?assetTypeId="+assetTypeId,
            success: function( data ) {
                var response = $.parseJSON(data);
                var newHtml = "<select id='assetSelectTypeAhead' class='form-control input-lg select2'>";

                var initVal = "";
                if(onLoad){
                    initVal = $.urlParam("assetId");
                }

                var selectedHtml = "";

                for (var i = 0; i < response.length; i++) {
                    if (response[i].id === "" || response[i].name === "") {
                        response.splice(i, 1);
                    }

                    if(initVal === ""){
                        if(i == 0){
                            selectedHtml = "selected='selected'";
                            initVal = response[i].id;
                        } else {
                            selectedHtml = "";
                        }
                    } else {
                        if(parseInt(response[i].id) === parseInt(initVal)){
                            selectedHtml = "selected='selected'";
                            initVal = response[i].id;
                        } else {
                            selectedHtml = "";
                        }
                    }
                    newHtml += "<option " + selectedHtml + " value='"+ response[i].id +"'>" + response[i].name + "</option>";
                }
                newHtml += "</select>";

                $("#assetTypeAhead").html(newHtml);

                $("#assetSelectTypeAhead").select2('destroy');
                $("#assetSelectTypeAhead").select2({
                    placeholder: "Select a Property",
                    width: 220,
                    allowClear: true
                });

                var asstId = $("#assetSelectTypeAhead").val();
                $("#assetId").val(asstId);

                $(".assetManageFormInput").css("display","inline-block");
                $("#assetSelectTypeAhead").on("change", function() {
                    var theID = $(this).select2('data').id;
                    var theSelection = $(this).select2('data').text;
                    $("#assetId").val(theID);
                });

                updateEvaluationList(onLoad);
            }
        } );
    };


    var updateSearchBtn = function(){
        var evaluationTypeId = $("#evaluationTypeId").val();
        if(typeof(evaluationTypeId) !== "undefined" && evaluationTypeId !== ""){
            $("#ytdEEScoresSubmit, #assetScoreTrackingSubmit").removeClass("disabled");
        } else {
            $("#ytdEEScoresSubmit, #assetScoreTrackingSubmit").addClass("disabled");
        }
    }


    $("#assetId, #standardYearId").on("change", function(){
        updateEvaluationList(false);
        updateSearchBtn();
    });

    $(document).on("change","#evaluationTypeId", function(){
        updateSearchBtn();
    });




    $("#assetTypeId").on("change", function(){
        //updateEvaluationList();
        if($(this).val() == "null"){
            return false;
        } else {
            updateAssetData(false);
        }
    });



    $("#internalReportPage #reportType").on("change", function(){
        $(".errorMsg").removeClass("hidden").addClass("hidden").html("");

        if($(this).val() === "" ){
            $("#generateReport1").hide();
            $("#generateReport2").hide();
            $("#generateReport3").hide();
        } else {
            if($(this).val() === "ASSET_SCORE_TRACKING" ){
                $("#generateReport1").hide();
                $("#generateReport2").show();
                $("#generateReport3").hide();
            }
            else {
                if($(this).val() === "RATING_REPORT" ){
                    window.location.href = "/report/rating";
                } else {
                    $("#generateReport1").show();
                    $("#generateReport2").hide();
                }
            }
        }
    });


    $("#assetScoreTrackingSubmit").on("click", function(){
        var v1 = validationAssetId();
        var v2 = validateEvaluationTypeId();
        return (v1 && v2);
    });

    $("#assetIdTypeAhead").on("click", function(){
        $(this).select();
    });




    updateSearchBtn();


    if($("#assetScoreTrackingPage").length > 0){
        updateAssetData(true);
    } else {
        $('#generateReportForm').get(0).reset();
        if($("#assetTypeId").val()) {
            updateAssetData(false);
        }
    }







});

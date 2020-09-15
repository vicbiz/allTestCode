$(document).ready(function() {

    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var getEvaluationTypes = function(isOnload){
        var selectedVal = $("#yearId").find("option:selected").val();
        var preSelectedVal = "";
        if(isOnload){
            preSelectedVal = parseInt($("#evaluationTypeId").attr("data-selected"));
        }
        $.ajax( {
            type: "GET",
            url: "/CMS/ajaxEvaluationTypesByYear?y="+selectedVal,
            success: function( response ) {
                var html = '<option value="null">Select Evaluation Type</option>';
                $.each(response, function(){
                    if(preSelectedVal === this.id){
                        html += '<option value="'+this.id+'" selected="selected" >'+this.name+'</option>';
                    } else {
                        html += '<option value="'+this.id+'">'+this.name+'</option>';
                    }
                });
                $("#evaluationTypeId").html(html);
                $("#evaluationTypeIdWrap").removeClass('hidden');
            }
        } );
    };

    var resetDropDown = function(target){
        $(target+" option").removeAttr("selected");
        $(target+" option[value='null']").attr('selected', 'selected');
        $(target).selectpicker("render");
    };

    $("#yearId").on("change", function(){
        getEvaluationTypes(false);
        resetDropDown("#evaluationTypeId");
        resetDropDown("#assetTypeId");
        if($("#sectionIdWrap").length > 0){
            resetDropDown("#sectionId");
        }
    });

    $("#evaluationTypeId").on("change", function(){
        resetDropDown("#assetTypeId");
        if($("#sectionIdWrap").length > 0){
            resetDropDown("#sectionId");
        }
        if($("#classificationId").length > 0){
            resetDropDown("#classificationId");
        }

        $("#assetTypesWrap").removeClass('hidden');
        if($("#evaluationTypeId").find("option:selected").val() === 'null'){
            $("#assetTypesWrap").addClass('hidden');
            if($("#sectionIdWrap").length > 0){
                $("#sectionIdWrap").addClass('hidden');
            }
            $(".submitBtn").addClass('hidden');
        } else {
            $("#assetTypesWrap").removeClass('hidden');
        }
    });

    var getSections = function(isOnload){
        var etData = $("#evaluationTypeId").find("option:selected").val();
        var atData = $("#assetTypeId").find("option:selected").val();
        if(isOnload){
            if($("#evaluationTypeId").attr("data-selected") !== "0"){
                etData = parseInt($("#evaluationTypeId").attr("data-selected"));
            }
        }

        var preSelectedVal = parseInt($("#sectionId").attr("data-selected"));
        $.ajax( {
            type: "GET",
            url: "/CMS/ajaxSectionsByEvaluationTypeAndAssetType?et="+etData+"&at="+atData,
            success: function( response ) {
                var html = '<option value="null">Select Section</option>';

                if(preSelectedVal === -1) {
                    html += '<option value="-1" selected="selected">All</option>'
                } else {
                    html += '<option value="-1">All</option>'
                }

                $.each(response, function(){
                    if(preSelectedVal === this.id){
                        html += '<option value="'+this.id+'" selected="selected" >'+this.name+'</option>';
                    } else {
                        html += '<option value="'+this.id+'">'+this.name+'</option>';
                    }
                });
                $("#sectionId").html(html);
                if($("#assetTypeId").find("option:selected").val() === 'null'){
                    $("#sectionIdWrap").addClass('hidden');
                    $(".submitBtn").addClass('hidden');
                } else {
                    $("#sectionIdWrap").removeClass('hidden');
                }
            }
        } );
    };

    $("#assetTypeId").on("change", function(){
        if($("#sectionIdWrap").length > 0){
            getSections(false);
            resetDropDown("#sectionId");
        }
    });



    if($("#submittedEvaluationsReport").length > 0){
        $("#sectionId").on("change", function(){
            $(".submitBtn").removeClass('hidden');
            if($(".tableWrap > div").is(":visible")){
                $(".tableWrap > div").removeClass('hidden');
            }
        });
    }


    if($("#sectionListForm").length > 0 || $("#classificationListForm").length > 0){
        $("#assetTypeId").on("change", function(){
            $(".submitBtn").removeClass('hidden');
            if($(".tableWrap > div").is(":visible")){
                $(".tableWrap > div").removeClass('hidden');
            }
        });
    }


    if($("#yearId").find("option:selected").val() !== "null"){
        getEvaluationTypes(true);
        if($("#sectionIdWrap").length > 0){
            getSections(true);
        }
    }

    if($("#data").length > 0){
        var oTable = $("#data").dataTable({
            "sPaginationType": "full_numbers",
            "iDisplayLength": 25,
            "bSort": false
        });

        // default filter = archived hidden
        oTable.fnFilter('false', 9);

        $("#classification").on("change", function(){
            var selectedVal = $(this).val();
            oTable.fnFilter(selectedVal, 5);
        });

        $("#filter").on("change", function(){
            var selectedVal = $(this).val();
            switch(selectedVal) {
                case "Facility Standards":
                    oTable.fnFilter('true', 6);
                    resetFiltersOtherThanIndex(6);
                    break;
                case "Client-Facing":
                    oTable.fnFilter('true', 7);
                    resetFiltersOtherThanIndex(7);
                    break;
                case "Non Client-Facing":
                    oTable.fnFilter('false', 7);
                    resetFiltersOtherThanIndex(7);
                    break;
                case "Core Standards":
                    oTable.fnFilter('true', 8);
                    resetFiltersOtherThanIndex(8);
                    break;
                case "Not Core Standards":
                    oTable.fnFilter('false', 8);
                    resetFiltersOtherThanIndex(8);
                    break;
                case "Auto-fill for YES":
                    oTable.fnFilter('true', 10);
                    resetFiltersOtherThanIndex(10);
                    break;
                case "No Auto-fill for YES":
                    oTable.fnFilter('false', 10);
                    resetFiltersOtherThanIndex(10);
                    break;
                default:
                    resetFiltersOtherThanIndex();
                    break;
            }
        });

        $("#archived").on("change", function() {
            var filterBy = $(this).attr('checked') ? 'true' : 'false';
            oTable.fnFilter(filterBy, 9);
        });

        function resetFiltersOtherThanIndex(colIndex) {
            var resetColIndexes = [6, 7, 8, 10];

            $.each(resetColIndexes, function(index, value) {
                if(value != colIndex) {
                    oTable.fnFilter('', value)
                }
            });
        }
    }


});
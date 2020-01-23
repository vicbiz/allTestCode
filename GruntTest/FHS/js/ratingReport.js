$(document).ready(function() {




    var filterByregion = function(reg, subreg) {
        var filterBy = $("#filterByregion").val().replace("&","").trim();
        if(filterBy === ""){
            oTable.fnFilter('', reg);
            oTable.fnFilter('', subreg);
        } else {
            var filterArray = filterBy.split('|');
            if(filterBy.indexOf("|") > -1){
                if(filterBy === "The Americas|USA -"){
                    oTable.fnFilter('', reg);
                    oTable.fnFilter(filterArray[1], subreg);
                } else {
                    oTable.fnFilter('', reg);
                    oTable.fnFilter("^"+filterArray[1]+"$", subreg, true, false); // Exact Match filter
                }
            } else {
                oTable.fnFilter("^"+filterArray[0]+"$", reg, true, false); // Exact Match filter
                oTable.fnFilter('', subreg);
            }
        }
    }



    if($("#ratingReportsSearch").length > 0){

        //$("#ratingReportsSearch select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});
        //$("#downloadReport select").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'});

        var oTable = $("#ratingReportsSearchTable").dataTable({
            "sPaginationType": "full_numbers",
            "aoColumns": [
                null,
                null,
                null,
                null,
                {"sType": "percent"},
                {"sType": "percent"},
                {"sType": "percent"},
                null,
                null,
                null,
                {"bSortable" : false},
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "aaSorting": [[0, "asc"]],
            "iDisplayLength": 100
        });

        $("#noteOnly").on("change", function(){ filterForNoteOnly(oTable, "#noteOnly", 10); });
        filterForNoteOnly(oTable, "#noteOnly", 10);

        $("#showArchived").on("change", function(){ filterArchived(oTable, "#showArchived", 14); });
        filterArchived(oTable, "#showArchived", 14);

        $(document).on("change","#partnerStatus", function(){ updateFilter(oTable, "#partnerStatus",13); });
        updateFilter(oTable, "#partnerStatus",13);

        $(document).on("change","#assetGroup", function(){ updateFilter(oTable, "#assetGroup",11); });
        updateFilter(oTable, "#assetGroup",11);

        $(document).on("change","#sourceEvaluationYear", function(){ updateFilter(oTable, "#sourceEvaluationYear",2); });
        updateFilter(oTable, "#sourceEvaluationYear",2);

        $(document).on("change","#displayDate", function(){ updateFilter(oTable, "#displayDate",3); });
        updateFilter(oTable, "#displayDate",3);

        $(document).on("change","#finalRating", function(){ updateFilter(oTable, "#finalRating",1); });
        updateFilter(oTable, "#finalRating",1);




        $("#filterByregion").on("change", function () {
            filterByregion(15,16);
        });

        filterByregion(15,16);
    }



    //*****************************************************************************************************************************************
    if($("#ratingReportsAssetHistory").length > 0){
        var oTable = $("#assetHistoryTable").dataTable({
            "sPaginationType": "full_numbers",
            "oLanguage": {
                "sEmptyTable": "Sorry, no results. Please select a different asset."
            },
            "aoColumns": [
                null,
                null,
                null,
                null,
                null,
                null,
                {"sType": "percent"},
                {"sType": "percent"},
                {"sType": "negative-num"},
                {"sType": "negative-num"},
                {"sType": "negative-num"},
                {"sType": "percent"},
                null,
                null
            ],
            "aaSorting": [[1, "desc"]],
            "iDisplayLength": 100
        });

        var updateData = function(){
            var assetTypeId = $("#assetTypeId").val();
            $.ajax( {
                type: "GET",
                url: "/asset/ajaxNamesByType?searchType=ALL&assetTypeId="+assetTypeId,
                success: function( data ) {
                    var response = $.parseJSON(data);

                    var newHtml = "<select id='assetSelectTypeAhead' name='id' class='form-control input-lg select2'><option value=''></option>";
                    var initVal = $("#assetTypeAhead").attr("data-init");
                    var selectedHtml = "";
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].id === "" || response[i].name === "") {
                            response.splice(i, 1);
                        }
                        if(parseInt(response[i].id) === parseInt(initVal)){
                            //console.log("found");
                            selectedHtml = "selected='selected'";
                        } else {
                            selectedHtml = "";
                        }
                        newHtml += "<option " + selectedHtml + " value='"+ response[i].id +"'>" + response[i].name + "</option>";
                    }
                    newHtml += "</select>";

                    $("#assetTypeAhead").html(newHtml);
                    $("#assetSelectTypeAhead").select2('destroy');
                    $("#assetSelectTypeAhead").select2({
                        placeholder: "Select a Property",
                        width: 300,
                        allowClear: true
                    });
                    $(".assetManageFormInput").css("display","inline-block");
                    $("#assetSelectTypeAhead").on("change", function() {
                        var theID = $(this).select2('data').id;
                        var theSelection = $(this).select2('data').text;
                        $("#assetId").val(theID);
                    });
                }
            } );
        };

        if($("#noteOnly").length > 0){
            // $("#noteOnly").on("change", function(){ filterForNoteOnly(oTable, "#noteOnly", 12); });
            // filterForNoteOnly(oTable, "#noteOnly", 12);

            var updateNoteOnlyList = function(){
                if($("#noteOnly").prop('checked')){
                    oTable.fnFilter('true', 13);
                } else {
                    oTable.fnFilter("", 13);
                }
            }
            $("#noteOnly").on("change", function(){
                updateNoteOnlyList();
            });
            updateNoteOnlyList();
        }

        if($("#assetTypeId").length > 0){
            $("#assetTypeId").on("change", function(){
                if($(this).val() == "null"){
                    $(".assetManageFormInput").css("display","none");
                    return false;
                } else {
                    updateData();
                }
            });
        }

        //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

        if($("#assetTypeId").val() !== "null"){
            updateData();
            $(".assetManageFormInput").css("display","inline-block");
        }
    }



    //*****************************************************************************************************************************************
    if($("#ratingReportsOverallHistory").length > 0) {
        //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

        var oTable = $("#data").dataTable({
            "bAutoWidth": false,
            "sPaginationType": "full_numbers",
            "aoColumnDefs": [
                {
                    aTargets: [-1]
                }
            ],
            "aaSorting": [[3, "asc"]],
            "iDisplayLength": 100
        });

        $(document).on("change","#assetGroup", function(){ updateFilter(oTable, "#assetGroup",1); });
        updateFilter(oTable, "#assetGroup",1);

        $(document).on("change","#mostRecent", function(){ updateFilter(oTable, "#mostRecent",0); });
        updateFilter(oTable, "#mostRecent",0);

        $(document).on("change","#showArchived", function(){ filterArchived(oTable, "#showArchived",2); });
        filterArchived(oTable, "#showArchived", 2);

        //$("#showArchived").on("change", function(){ filterArchived(oTable, "#showArchived", 2); });
        //filterArchived(oTable, "#showArchived", 2);

        $("#filterByregion").on("change", function () {
            filterByregion(7,8);
        });

        filterByregion(7,8);
    }

    var assetGroup = $.urlParam('assetGroup').replace(/\+/g, ' ');
    $('#assetGroup option[value="'+assetGroup+'"]').prop('selected', true).change();


});

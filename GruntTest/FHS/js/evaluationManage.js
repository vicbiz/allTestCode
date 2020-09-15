$(document).ready(function() {
    if($("#completedEvaluationsPage").length > 0){
        var userRoleSort = $("#assetManageForm").attr("data-userrolesort");

        if($("#evalTable").length > 0){
            var oTable = $("#evalTable").dataTable({
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
                    {"sType": "percent"},
                    {"sType": "percent"},
                    null,
                    {"bSortable" : false},
                    null
                ],
                "bAutoWidth": false, // Disable the auto width calculation
                //"aaSorting": [[4, userRoleSort]]
                "aaSorting": [ [2,'desc'], [1,'desc'] ]
            });

            var updateOnlyEE = function(){
                var onlyEE = $("#onlyEE").prop('checked');
                if(onlyEE){
                    //oTable.fnFilter("^[0-9a-zA-Z]", 11, true, false, true, true); // filtering not empty data
                    oTable.fnFilter("true", 12);
                } else {
                    oTable.fnFilter("", 12);
                }
            }

            $("#onlyEE").on("change", function () {
                updateOnlyEE();
            });
            updateOnlyEE();
            $("#standardYearId").on("change", function(){
                var selectedVal = $(this).val();
                oTable.fnFilter(selectedVal, 2);
            });
        }

        var updateData = function(){
            var assetType = $("#assetType").val();
            var searchType = $("#showOnlyArchived").is(':checked') ? "ARCHIVED" : "ACTIVE";
            $.ajax( {
                type: "GET",
                url: "/asset/ajaxNamesByType?assetTypeId="+assetType+"&searchType="+searchType,
                success: function( data ) {
                    var response = $.parseJSON(data);

                    var newHtml = "<select id='assetSelectTypeAhead' class='form-control input-lg select2'><option value=''></option>";
                    var initVal = $("#assetId").attr("data-init");
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





        $("#assetType").on("change", function(){
            if($(this).val() == "null"){
                $(".assetManageFormInput").css("display","none");
                return false;
            } else {
                updateData();
            }
        });

        $("#showOnlyArchived").on("change", function(){
                updateData();
        });

        //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});


        if($("#assetType").val() !== "null"){
            updateData();
            $(".assetManageFormInput").css("display","inline-block");
        }

        $("#evaluationType").on("change", function(){
            var selectedVal = $(this).val();
            if(selectedVal === "BRAND"){
                //oTable.fnFilter('',3);
                //oTable.fnFilter(selectedVal, 0);
                oTable.fnFilter('^(?!FTG).+', 3, true, false);
            } else {
                //oTable.fnFilter('',0);
                oTable.fnFilter(selectedVal, 3);
            }
        });
        $("#displayDate").on("change", function(){
            var selectedVal = $(this).val();
            oTable.fnFilter(selectedVal, 1);
        });


        var filterByEvalStatus = function() {
            var publishedCheckValue = $("#published").prop('checked');
            var notPublishedCheckValue = $("#notPublished").prop('checked');
            var canceledCheckValue = $("#canceled").prop('checked');
            var checks = [];

            if(publishedCheckValue) { checks.push("Approved Published") }
            if(notPublishedCheckValue) { checks.push("Approved Not Published") }
            if(canceledCheckValue) { checks.push("Canceled") }

            if(checks.length == 0) {
                oTable.fnFilter('*****NO*SELECTION*****',4);
            } else {
                var filterBy = checks.join('|');
                oTable.fnFilter("^"+filterBy+"$", 4 , true, false); // Exact Match filter
            }
        }

        $("#evalListCheckBoxOptions input").on("change", function () {
            filterByEvalStatus();
        });

        if($("#evalListCheckBoxOptions").length > 0){
            filterByEvalStatus();
        }





    }
});

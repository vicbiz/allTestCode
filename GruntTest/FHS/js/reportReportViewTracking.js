$(document).ready(function() {
    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var oTable = $("#data").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            {
                aTargets: [-1]
            }
        ],
        "aoColumns": [
            { "sWidth": "15%"},
            { "sWidth": "40%"},
            { "sWidth": "5%" },
            { "sWidth": "5%" },
            { "sWidth": "5%" },
            { "sWidth": "5%" },
            { "sWidth": "5%" },
            { "sWidth": "5%" },
            { "sWidth": "5%" },
            { "sWidth": "5%" },
            { "sWidth": "5%" }
        ],
        "aaSorting": [[4, "desc"], [0, "asc"]]
    });

    $( "#startDate, #endDate" ).datepicker();
    $(".selectDateWrap button.calIcon").on("click", function(){
        var targetObj = $(this).attr("data-targetInput");
        $(targetObj).datepicker("show");
    });


    $("#approvedOnly").on("change", function () {
        var assignedCheckValue = $(this).prop('checked');
        if(assignedCheckValue){
            oTable.fnFilter("ApprovedPublished", 4, true);
        } else {
            oTable.fnFilter('',4);
        }
    });

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

    $("#generateReportSubmit").on("click", function(){
        return(validateDateSelection());
    });

    $("#evaluationType").on("change", function(){
        var selectedVal = $(this).val();
        if(selectedVal === ""){
            oTable.fnFilter("", 2 , true, false); // Show All
        } else {
            oTable.fnFilter("^"+selectedVal+"$", 2 , true, false); // Exact Match filter
        }
    });

    $("#downloadReport #downloadSelect").on("change", function () {
        var selectedVal = $(this).val();
        var startDate = $(this).attr("data-startDate");
        var endDate   = $(this).attr("data-endDate");
        if (selectedVal != "") {
            var downloadUrl = '/download/reportViewTrackingSpreadsheet?startDate='+startDate+'&endDate='+endDate+'&gsrp=' + (selectedVal === 'gsrp' ? 'true' : 'false');
            window.location.href = downloadUrl;
        }
    });

    $("#gsrp").on("click", function(){
        var isChecked = $(this).is(':checked');
        if(isChecked){
            oTable.fnFilter("Partner", 10 , true, false);
        } else {
            oTable.fnFilter("", 10);
        }
    });



});

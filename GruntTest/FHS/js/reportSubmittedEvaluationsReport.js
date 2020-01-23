$(document).ready(function() {
    //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var oTable = $("#data").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                aTargets: [-1]
            }
        ]
    });

    $( "#startDate, #endDate" ).datepicker();
    $(".selectDateWrap button.calIcon").on("click", function(){
        var targetObj = $(this).attr("data-targetInput");
        $(targetObj).datepicker("show");
    });

    $(".submittedEval select").on("change", function(){
        var selectedText =  $(this).find(":selected").text();
        var selectedColm =  parseInt($(this).attr("data-column"));
        //console.log("val :"+selectedText);
        //console.log("Filter Column :"+selectedColm);

        if(selectedText === "All"){
            oTable.fnFilter( "", selectedColm );
        } else {
            if(selectedText === "BRAND"){
                oTable.fnFilter('^(?!FTG).+', selectedColm, true, false);
            } else {
                oTable.fnFilter("^"+selectedText+"$", selectedColm , true, false); // Exact Match filter
            }
        }
    });


});

$(document).ready(function() {
    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var oTable = $("#data").dataTable({
        "sPaginationType": "full_numbers",
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

    $("#approvedOnly").on("change", function () {
        var assignedCheckValue = $(this).prop('checked');
        if(assignedCheckValue){
            oTable.fnFilter("ApprovedPublished", 4, true);
        } else {
            oTable.fnFilter('',4);
        }
    });
});

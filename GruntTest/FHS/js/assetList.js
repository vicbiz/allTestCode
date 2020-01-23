$(document).ready(function() {
    var oTable = $("#assetTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [-1]
            }
        ]
    });

    //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var updateYearFilters = function(val){
        var val = $("#gsrpStandardYears").val();
        if(val === ""){
            oTable.fnFilter("^[0-9a-zA-Z]", 1, true, false, true, true); // exclude empty data
        } else {
            var selectedYear = $("#gsrpStandardYears option:selected").text();
            oTable.fnFilter(selectedYear, 1, true, false, true, true);
        }
    }

    var updateGSRPTableFilter = function () {
        var isChecked = $(".gsrpFilter").is(':checked');
        if(isChecked){
            $("button#gsrpStandardYears").removeClass("disabled");
            oTable.fnFilter("^[0-9a-zA-Z]", 1, true, false, true, true); // exclude empty data
            updateYearFilters();
        } else {
            $("button#gsrpStandardYears").addClass("disabled");
            oTable.fnFilter("", 1, true, false, true, true);
        }
    }

    var updateArchivedFilter = function(){
        var val = $("#archivedFilterChkbox").is(":checked") ? "" : "false";
        oTable.fnFilter(val, 4);
    }

    $(".gsrpFilter").on("click", function () {
        updateGSRPTableFilter();
    });
    $("#gsrpStandardYears").on("change", function(){
        updateYearFilters();
    });
    updateGSRPTableFilter();

    $("#archivedFilterChkbox").on("change", function(){
        updateArchivedFilter();
    });
    updateArchivedFilter();
});


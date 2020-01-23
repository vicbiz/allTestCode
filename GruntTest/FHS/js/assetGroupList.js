$(document).ready(function () {
    var oTable = $("#assetTable").dataTable({
        "sPaginationType": "full_numbers",
        "iDisplayLength": 100,
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [-1]
            }
        ]
    });

    var updateFilters = function(fData, fCol){
        if(fData) {
            oTable.fnFilter(fData,fCol);
        } else {
            oTable.fnFilter('',fCol);
            oTable.fnFilter('');
        }
    }
    $("#corpDataType").on("change", function () {
        updateFilters($("#corpDataType").val(), 1);
    });
    updateFilters($("#corpDataType").val(), 1);



    $("#ratingYear").on("change", function () {
        updateFilters($("#ratingYear").val(), 5);
    });
    updateFilters($("#ratingYear").val(), 5);


    var updateChkFilter = function(){
        if($("#clientFacingCorpOnly").prop("checked")){
            updateFilters("Yes", 2);
        } else {
            updateFilters("", 2);
        }
    }
    $("#clientFacingCorpOnly").on("change", function () {
        updateChkFilter();
    });
    updateChkFilter();
});


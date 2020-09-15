$(document).ready(function() {

    var oTable = "";
    if($(".cpListingSER").length > 0){
        oTable = $(".cpListingSER").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aoColumns": [
                null,
                null,
                { "sType": "display-date" },
                { "sType": "percent" },
                { "sType": "percent" }
            ],
            "aaSorting": [[2, "desc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpListingRating").length > 0){
        oTable = $(".cpListingRating").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aoColumns": [
                null,
                null,
                { "sType": "percent" },
                { "sType": "Rating" },
                { "sType": "Rating" }
            ],
            "aaSorting": [[0, "asc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpListingBrandSER").length > 0){
        oTable = $(".cpListingBrandSER").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aoColumns": [
                null,
                null,
                { "sType": "display-date" },
                { "sType": "percent" }
            ],
            "aaSorting": [[2, "desc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpListingEE").length > 0){
        oTable = $(".cpListingEE").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aoColumns": [
                null,
                null,
                { "sType": "display-date" },
                { "sType": "percent" }
            ],
            "aaSorting": [[2, "desc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpListingEEshort").length > 0){
        oTable = $(".cpListingEEshort").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aoColumns": [
                null,
                null,
                { "sType": "percent" }
            ],
            "aaSorting": [[2, "desc"]],
            "sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "iDisplayLength": 10000000
        });
    }

    var updateFilters = function(fData, fCol){
        if(fData) {
            oTable.fnFilter(fData,fCol);
        } else {
            oTable.fnFilter('',fCol);
            oTable.fnFilter('');
        }
    }

    $(".tableFilterWrap select").on("change", function () {
        var val = $(this).val();
        var col = $(this).attr("data-filterColumn");
        updateFilters(val, col);
    });


});

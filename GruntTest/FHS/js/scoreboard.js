$(document).ready(function() {


    var oTable = $("#ratingReportScoreboardTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                aTargets: [-1]
            }
        ],
        "iDisplayLength": 25
    });

});



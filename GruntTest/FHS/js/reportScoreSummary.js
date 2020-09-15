$(document).ready(function() {
    var oTable1 = $("#highImpactClassificationTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: []
            }
        ],
        "aaSorting": [[0, "asc"]],
        "sDom": '<"H"f>rt',
        "iDisplayLength": 100000
    });

    var oTable2 = $("#classificationTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: []
            }
        ],
        "aaSorting": [[0, "asc"]],
        "sDom": '<"H"f>rt',
        "iDisplayLength": 100000
    });

    var oTable3 = $("#scoreSummarySectionTable, #scoreSummarySectionBrandTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: []
            }
        ],
        "aaSorting": [],
        "sDom": '<"H"f>rt',
        "iDisplayLength": 100000
    });

    var oTable4 = $("#emotionalTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: []
            }
        ],
        "aaSorting": [],
        "sDom": '<"H"f>rt',
        "iDisplayLength": 100000,
        "aoColumns": [
            { "sType": "overallFirst" },
            null
        ]
    });

});

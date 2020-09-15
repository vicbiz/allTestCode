$(document).ready(function () {
    var oTable = $("#attachments").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [0]
            }
        ],
        "aaSorting": [
            [1, "asc"]
        ],
        "aoColumns": [
            { "sWidth": "10%" },
            { "sWidth": "45%" },
            { "sWidth": "10%" },
            { "sWidth": "35%" }
        ]
    });
});

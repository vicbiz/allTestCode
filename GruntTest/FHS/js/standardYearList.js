$(document).ready(function() {
    var oTable = $("#table").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [-1]
            }
        ]
    });
});
$(document).ready(function() {
    var oTable = $("#assetTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [-1]
            }
        ],
        "aaSorting": [[5, "desc"]]
    });
});

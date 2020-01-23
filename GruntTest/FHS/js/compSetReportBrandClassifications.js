$().ready(function () {
    var oTable = $(".cpDataTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                //aTargets: [0,1,2,3,4]
                aTargets: []
            }
        ],
        // "aoColumns": opAoColumns,
        "aaSorting": [],
        "sDom": '<"H"f>rt',
        "bFilter": false,
        "bInfo": false,
        "iDisplayLength": 100000
    });
});

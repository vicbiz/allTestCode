$().ready(function(){
    $(".dataTable").each(function(){
        var targetId = "#"+$(this).attr("id");

        var oTable = $(targetId).dataTable({
            "sPaginationType": "full_numbers",
            "aoColumnDefs": [
                {
                    bSortable: false,
                    aTargets: [0,3]
                }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000,
            "aoColumns": [
                { "sWidth": "40%" }, // 1st column width
                { "sWidth": "15%" }, // 2nd column width
                { "sWidth": "15%", "sType": "percent" }, // 3rd column width
                { "sWidth": "35%" }
            ]
        });
    });

});

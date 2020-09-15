$().ready(function(){
    var isRatings = $("#summaryTable").attr("data-isRarings");
    if(isRatings === "true"){
        var oTable = $("#summaryTable").dataTable({
            "sPaginationType": "full_numbers",
            "aoColumnDefs": [
            ],
            "aaSorting": [[0, "asc"]],
            "sDom": '<"H"f>rt',
            "bFilter": true,
            "bInfo": false,
            "iDisplayLength": 1000000,
            "aoColumns": [
                { "sWidth": "35%"  },
                { "sWidth": "13%"},
                { "sWidth": "12%" },
                { "sWidth": "10%", "sType": "percent" }
            ]
        });
    } else {
        var oTable = $("#summaryTable").dataTable({
            "sPaginationType": "full_numbers",
            "aoColumnDefs": [
            ],
            "aaSorting": [[0, "asc"]],
            "sDom": '<"H"f>rt',
            "bFilter": true,
            "bInfo": false,
            "iDisplayLength": 1000000,
            "aoColumns": [
                { "sWidth": "35%"  },
                { "sWidth": "13%"},
                { "sWidth": "12%" },
                { "sWidth": "10%", "sType": "percent" },
                { "sWidth": "10%" },
                { "sWidth": "10%" },
                { "sWidth": "10%", "sType": "percent" }
            ]
        });
    }
});

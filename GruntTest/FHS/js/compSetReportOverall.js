$().ready(function () {


    var aoColumns = [], tdCt = $("table.cpDataTable thead tr:nth-child(1) th").length;
    for (var i = 0; i < tdCt; i++) {
        if(i === 0){
            aoColumns.push( null );
        } else {
            aoColumns.push( { 'sType': 'percent' } );
        }
    }

    var oTable = $(".cpDataTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                //aTargets: [0,1,2,3,4]
                aTargets: []
            }
        ],
        "aoColumns": aoColumns,
        "aaSorting": [],
        "sDom": '<"H"f>rt',
        "bFilter": false,
        "bInfo": false,
        "iDisplayLength": 100000
    });

    // Need to hack to avoid jQplot hidden chart problem....
    $("#cpOverRollSelector input:radio").unbind('click').bind('click', function (event) {
        var selected = "#cpBarChartGroup  #"+$(this).val();
        $("#cpBarChartGroup .barGraphChart").parent().addClass("hideChart");
        $(selected).parent().removeClass("hideChart");
    });
    $("#cpBarChartGroup .barGraphChart").parent().addClass("hideChart");
    $("#cpBarChartGroup  #cpOverRollBarchart1").parent().removeClass("hideChart");
});

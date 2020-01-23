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

    // Need to hack to avoid jQplot hidden chart problem....
    $("#cpOverRollSelector input:radio").unbind('click').bind('click', function (event) {
        var selected = "#cpBarChartGroup  #"+$(this).val();
        $("#cpBarChartGroup .barGraphChart").parent().addClass("hideChart");
        $(selected).parent().removeClass("hideChart");
        $(window).trigger('resize');
    });
    $("#cpBarChartGroup .barGraphChart").parent().addClass("hideChart");
    $("#cpBarChartGroup  #cpOverRollBarchart1").parent().removeClass("hideChart");
});

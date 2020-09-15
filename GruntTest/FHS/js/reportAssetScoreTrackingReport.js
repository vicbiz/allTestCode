$(document).ready(function() {
    var adjustTdWidth = function(tblObj, firstTdWidth){
        var $tableObj = $(tblObj);
        var widthTbl = $tableObj.width();
        var tdCount = $(tblObj + " tr:nth-child(1) td").length -1;
        var newTdWidth = Math.floor((widthTbl - firstTdWidth) / tdCount);
        // console.log("widthTbl :"+widthTbl);
        // console.log("tdCount :"+tdCount);
        // console.log("newTdWidth :"+newTdWidth);
        // console.log("window.width :"+$( window ).width());
        return newTdWidth;
    };
    $("#assetScoreTrackingPageTables table tr td").css("min-width","70px");

    var firstTdWidth = 200;
    var newTdWidth = adjustTdWidth("#overallTable", firstTdWidth);

    $("#assetScoreTrackingPageTables table").css("table-layout","fixed");
    $("#assetScoreTrackingPageTables table tr:nth-child(1) td").css("width",newTdWidth);
    $("#assetScoreTrackingPageTables table tr:nth-child(1) td:nth-child(1)").css("width",firstTdWidth);

    var oTable = $("#sectionsTable, #classificationsTable").dataTable({
        "sPaginationType": "full_numbers",
        "sDom": '<"H"f>rt',
        "bFilter": true,
        "bInfo": false,
        "iDisplayLength": 100000,
        "bAutoWidth": false,
        "bSort": false
    });
});

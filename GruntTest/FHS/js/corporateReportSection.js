$(document).ready(function() {

    var oTable = "";

    if($(".cpOverallSER").length > 0){
        oTable = $(".cpOverallSER").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                null,
                { "sType": "percent" },
                null,
                { "sType": "percent" },
                null
            ],
            "aaSorting": [[5, "asc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpOverallRatings").length > 0){
        oTable = $(".cpOverallRatings").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                { "sType": "percent" },
                { "sType": "percent" },
                { "sType": "percent" },
                { "sType": "Rating" },
                { "sType": "Rating" }
            ],
            "aaSorting": [[5, "desc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpOverallBrandSER").length > 0){
        oTable = $(".cpOverallBrandSER").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                null,
                { "sType": "percent" },
                null
            ],
            "aaSorting": [[5, "asc"]],
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpOverallEE").length > 0){
        oTable = $(".cpOverallEE").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                null,
                { "sType": "percent" },
                null
            ],
            "aaSorting": [[5, "asc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }



    if($(".cpSectionSER").length > 0){
        oTable = $(".cpSectionSER").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                null,
                { "sType": "percent" },
                null,
                { "sType": "percent" },
                null
            ],
            "aaSorting": [[5, "asc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpSectionRatings").length > 0){
        oTable = $(".cpSectionRatings").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                { "sType": "percent" },
                null,
                { "sType": "percent" },
                null
            ],
            "aaSorting": [[4, "asc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpSectionBrandSER").length > 0){
        oTable = $(".cpSectionBrandSER").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                null,
                { "sType": "percent" },
                null
            ],
            "aaSorting": [[5, "asc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }

    if($(".cpSectionEE").length > 0){
        oTable = $(".cpSectionEE").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                null,
                { "sType": "percent" },
                null
            ],
            "aaSorting": [[5, "asc"]],
            //"sDom": '<"H"f>rt',
            //"bFilter": false,
            //"bInfo": false,
            "bPaginate": false,
            "iDisplayLength": 10000000
        });
    }


    var updateFilters = function(fData, fCol){
        if(fData) {
            oTable.fnFilter(fData,fCol);
        } else {
            oTable.fnFilter('',fCol);
            oTable.fnFilter('');
        }
    }



    var updateIdList = function(tbl){
        var idList = "";
        var rowData = tbl.fnGetNodes();
        for ( var i=0 ; i < rowData.length ; i++ ){
            var $ckbx = $(rowData[i]).find("input:checkbox");
            if($ckbx.prop("checked")){
                idList += $ckbx.attr("data-id") + ',';
            }
        }
        idList = idList.slice(0,-1);
        $("#cpSelectSection #mySelectedIds").val(idList);
        $("#cpSelectSection #mySelectedIds").attr("value",idList);
        //console.log("idList :"+idList);
    }


    var getCheckedCt = function(tbl){
        var selCt = 0;
        var rowData = tbl.fnGetNodes();
        for ( var i=0 ; i < rowData.length ; i++ ){
            //console.log("checked "+$(rowData[i]).find("input:checkbox").prop("checked"));
            if($(rowData[i]).find("input:checkbox").prop("checked")){ ++selCt;}
        }
        return selCt;
    }



    var updateClearMySelectionBtn = function(tbl){
        var selCt = getCheckedCt(tbl);
        if(selCt > 0){
            $(".btnClearMySelection").removeClass("disabled");
            $("#mySelCt").html(" ("+selCt+")");
        } else {
            $(".btnClearMySelection").addClass("disabled");
            $("#mySelCt").html("");
        }
    };
    updateClearMySelectionBtn(oTable);




    var updateGraphData = function(){
        $("#cpOverallMy .corpBarchart").each(function(i){

            var dataCorpAvg = JSON.parse($("#cpOverallHigh > .corpBarchart:eq("+0+")").attr("data-data"))[0];
            var dataCorpAvgLabel = JSON.parse($("#cpOverallHigh > .corpBarchart:eq("+0+")").attr("data-label"))[0];

            var dataVal = dataCorpAvg + ',';
            var dataTxt = '"' + dataCorpAvgLabel + '",';
            var idx = i+1;

            var dataCt = getCheckedCt(oTable);

            var temp = [];



            if(dataCt > 0){
                var rowData = oTable.fnGetNodes();
                for ( var i=0 ; i < rowData.length ; i++ ){
                    $thisCkbx = $(rowData[i]).find("input:checkbox");
                    if($thisCkbx.prop("checked")){

                        var v = " ";
                        var t = "";

                        var tempVal = $thisCkbx.parent().parent().find(".chartData"+idx).text();
                        if(tempVal === ""){
                            //dataVal += '" ",';
                            v = " ";
                        } else {
                            //dataVal += $thisCkbx.parent().parent().find(".chartData"+idx).text().replace("%","") + ',';
                            v = $thisCkbx.parent().parent().find(".chartData"+idx).text().replace("%","");
                        }
                        //dataTxt  += '"'+$thisCkbx.parent().parent().find(".chartDataTxt").text() + '",';
                        t = $thisCkbx.parent().parent().find(".chartDataTxt").text();
                        temp.push({val:v, txt: t});
                    }
                }

                temp.sort(function(a,b){
                    //****** Sort Alphabetical Order
                    //if(a.val > b.val){ return 1}
                    //if(a.val < b.val){ return -1}
                    //return 0;

                    //****** Sort Numeric Order
                    return a.val - b.val;
                });

                $.each(temp, function(key, obj) {
                    dataVal += '"'+ obj.val +'",';
                    dataTxt += '"'+ obj.txt +'",';
                });
            }

            if(dataCt < maxMySelection){
                for(var i=0; i < maxMySelection-dataCt; i++){
                    dataVal += "0,";
                    dataTxt += '" ",';
                }
            }




            dataVal = "["+dataVal.slice(0,-1)+"]";
            dataTxt = "["+dataTxt.slice(0,-1)+"]";

            //console.log("dataVal:"+dataVal);
            //console.log("dataTxt:"+dataTxt);

            $(this).attr("data-data", dataVal);
            $(this).attr("data-label",dataTxt);

        });
    }




    var cpClearAllMySelection = function(tbl){
        var rowData = tbl.fnGetNodes();
        for ( var i=0 ; i < rowData.length ; i++ ){
            $(rowData[i]).find("input:checkbox").prop("checked", "")
        }
        $("#mySelCt").html("");
        updateGraphData();
        $(window).trigger("resize");
    };












    $(".mySelectionTable .mySelectionChkBx").on("click",function(){

        if(!$("#cpOverallMy").is(":visible")){
            $("#mySelectionRadioBtn").trigger("click");
            var selectedTab = $("#cpHighLowBttn input[name=cpGroup]:checked").val();
            $(".cpTab").hide();
            $("#"+selectedTab).show();
        }

        if($(this).prop("checked") && $(".mySelectionTable input.mySelectionChkBx:checked:enabled").length > maxMySelection){
            $(this).prop("checked", false);
        } else {
            updateIdList(oTable);
            updateClearMySelectionBtn(oTable);
            updateGraphData();
            $(window).trigger("resize");
        }

    });

    updateIdList(oTable);
    updateClearMySelectionBtn(oTable);
    updateGraphData();
    $(window).trigger("resize");






    $(".tableFilterWrap select").on("change", function () {
        var val = $(this).val();
        var col = $(this).attr("data-filterColumn");
        //console.log("val:"+val+" col:"+col);
        updateFilters(val, col);
    });


    $(".btnGraphMySelection").on("click", function(){
        $("#cpHighLowBttn #mySelectionRadioBtn").prop("checked", true).trigger("click");
        //$("#cpHighLowBttn #mySelectionRadioBtn").trigger("change");
    });


    $(".btnClearMySelection").on("click", function(){
        cpClearAllMySelection(oTable);
        updateClearMySelectionBtn(oTable);
        $("#cpHighLowBttn #mySelectionRadioBtn").prop("checked", true).trigger("click");
    });

});

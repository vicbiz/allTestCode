$(document).ready(function () {
    if($("#publishingToolPage").length > 0){
        var oTable = $("#publishableTable").dataTable({
            "sPaginationType": "full_numbers",
            "iDisplayLength": 100,
            "aLengthMenu": [[50, 100, 500, 1000 , -1], [50, 100, 500, 1000, "All"]],
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0, -2]
                }
            ],
            //"aoColumns": [
            //    null,
            //    null,
            //    null,
            //    { "sType": "display-date" },
            //    null,
            //    null,
            //    null
            //],
            //"aaSorting": [[3, "desc"]]
            "aaSorting": [[2, "asc"],[1, "asc"]]
        });
        var oTableInProgress = $("#inProgressTable").dataTable({
            "sPaginationType": "full_numbers",
            "iDisplayLength": 100,
            "aLengthMenu": [[50, 100, 500, 1000 , -1], [50, 100, 500, 1000, "All"]]
            //aoColumnDefs: [
            //    {
            //        bSortable: false,
            //        aTargets: [-1]
            //    }
            //]
        });
        var oTableNotifiable = $("#notifiableTable").dataTable({
            "sPaginationType": "full_numbers",
            "iDisplayLength": 100,
            "aLengthMenu": [[50, 100, 500, 1000 , -1], [50, 100, 500, 1000, "All"]],
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            //"aaSorting": [[2, "asc"],[1, "asc"]]
            "aaSorting": [[7, "desc"]]
        });


        var updateFilters = function(oTbl, fData, fCol){
            if(fData) {
                oTbl.fnFilter(fData,fCol);
            } else {
                oTbl.fnFilter('',fCol);
                oTbl.fnFilter('');
            }
        }
        $("#displayDate").on("change", function () {
            updateFilters(oTable, $("#displayDate").val(), 5);
        });
        $("#assetType").on("change", function () {
            updateFilters(oTable, $("#assetType").val(), 4);
        });
        $("#region").on("change", function () {
            updateFilters(oTable, $("#region").val(), 3);
        });
        $("#ratingYear").on("change", function () {
            updateFilters(oTable, $("#ratingYear").val(), 6);
        });
        updateFilters(oTable, $("#displayDate").val(), 5);
        updateFilters(oTable, $("#assetType").val(), 4);
        updateFilters(oTable, $("#region").val(), 3);
        updateFilters(oTable, $("#ratingYear").val(), 6);




        $("#displayDateNotify").on("change", function () {
            console.log("changed");
            updateFilters(oTableNotifiable, $("#displayDateNotify").val(), 5);
        });
        $("#assetTypeNotify").on("change", function () {
            updateFilters(oTableNotifiable, $("#assetTypeNotify").val(), 4);
        });
        $("#regionNotify").on("change", function () {
            updateFilters(oTableNotifiable, $("#regionNotify").val(), 3);
        });
        updateFilters(oTableNotifiable, $("#displayDateNotify").val(), 5);
        updateFilters(oTableNotifiable, $("#assetTypeNotify").val(), 4);
        updateFilters(oTableNotifiable, $("#regionNotify").val(), 3);







        var updateRegionSelect = function(oTbl, $target){
            var regionArray = [];
            var rowData = oTbl.fnGetNodes();
            for ( var i=0 ; i < rowData.length ; i++ ){
                var rg = $(rowData[i]).find("td:nth-child(4)").text();

                if($.trim(rg) !== "" && $.inArray(rg,regionArray) === -1){
                    regionArray.push(rg);
                }
            }
            var html = '<option value="" selected="selected">All</option>';
            $.each(regionArray, function(i){
                html += '<option value="'+regionArray[i]+'">'+regionArray[i]+'</option>';
            });
            $target.html("");
            $target.append(html);
        }

        updateRegionSelect(oTable, $("#region"));
        updateRegionSelect(oTableNotifiable, $("#regionNotify"));






        // datatable hidden pages checkbox select... refresh
        var checkAll = function($ckbox, tbl){
            var dtCount = tbl.fnGetData().length;
            if(dtCount === 0){
                $ckbox.attr("disabled", true);
                $ckbox.parent().find("label").addClass("disabledLabel")
                $ckbox.parentsUntil("form").find('input:submit').attr("disabled", true);
            } else {
                $ckbox.removeAttr("disabled");
                $ckbox.parent().find("label").removeClass("disabledLabel")
                $ckbox.parentsUntil("form").find('input:submit').removeAttr("disabled");
            }


            var checkAllBox = $ckbox.prop("checked");
            var rowData = tbl.fnGetNodes();
            for ( var i=0 ; i < rowData.length ; i++ ){
                $(rowData[i]).find("input:checkbox").prop("checked", checkAllBox)
            }
        }
        $("#checkAll").on("change", function(){
            checkAll($(this), oTable);
        });
        $("#checkAllNotifiable").on("change", function(){
            checkAll($(this), oTableNotifiable);
        });
        $("#checkAll,#checkAllNotifiable").prop("checked",false);
        checkAll($("#checkAll"),oTable);
        checkAll($("#checkAllNotifiable"),oTableNotifiable);




        $("#publishableTable td input:checkbox").on("click", function(){
            var dtCount = oTable.fnGetData().length;
            var ckCount = 0;
            var rowData = oTable.fnGetNodes();
            for ( var i=0 ; i < rowData.length ; i++ ){
                var $ckbx = $(rowData[i]).find("input:checkbox");
                if($ckbx.prop("checked")){
                    ++ckCount;
                }
            }
            if(ckCount === dtCount){
                $("#checkAll").prop("checked","checked");
            } else {
                $("#checkAll").prop("checked","");
            }
            //console.log("dtCount :"+dtCount+ "ckCount :"+ckCount);
        });
        $("#notifiableTable td input:checkbox").on("click", function(){
            var dtCount = oTableNotifiable.fnGetData().length;
            var ckCount = 0;
            var rowData = oTableNotifiable.fnGetNodes();
            for ( var i=0 ; i < rowData.length ; i++ ){
                var $ckbx = $(rowData[i]).find("input:checkbox");
                if($ckbx.prop("checked")){
                    ++ckCount;
                }
            }
            if(ckCount === dtCount){
                $("#checkAllNotifiable").prop("checked","checked");
            } else {
                $("#checkAllNotifiable").prop("checked","");
            }
            //console.log("dtCount :"+dtCount+ "ckCount :"+ckCount);
        });






        var totalProgressOnLoad = oTableInProgress.fnSettings().fnRecordsTotal();
        var addedDataID = [];
        var updateProcessingTable = function(response){

            var onloadProcessingList = [];
            var processingTableData = oTableInProgress.fnGetNodes();
            for ( var i=0 ; i <= processingTableData.length ; i++ ){
                if($(processingTableData[i]).attr("id")){
                    onloadProcessingList.push($(processingTableData[i]).attr("id"));
                }
            }

            for(var i=0; i<response.length; i++){
                var targetId = "eval"+response[i];
                if($.inArray(targetId, onloadProcessingList) >= 0){
                    var aIndex = $.inArray(targetId, onloadProcessingList);
                    onloadProcessingList.splice($.inArray(targetId, onloadProcessingList), 1 );
                }
            }

            for(var i=0; i<onloadProcessingList.length; i++){
                for ( var j=0 ; j < processingTableData.length ; j++ ){
                    if(onloadProcessingList[i] === $(processingTableData[j]).attr("id")){

                        if($.inArray(onloadProcessingList[i], addedDataID) >= 0){


                        } else {



                            var $processedRow = $(processingTableData[j]);
                            $processedRow.addClass("processed");
                            $processedRow.fadeOut(2000, function(){
                                var position = oTableInProgress.fnGetPosition($(this).get(0));
                                $(this).remove();
                                oTableInProgress.fnDeleteRow(position, function(){
                                    var queueCt = oTableInProgress.fnSettings().fnRecordsTotal();
                                    $("#processing_info_total").html(queueCt);
                                    $("#processed_info_total").html(totalProgressOnLoad - queueCt);
                                });
                            });




                            addedDataID.push(onloadProcessingList[i]);
                            var evalId = onloadProcessingList[i].replace("eval","");
                            var newRowData = [];
                            var processMsg = '';

                            newRowData.push('<input type="hidden" name="_idsToNotify"><input id="idsToNotify" type="checkbox" value="'+evalId+'" name="idsToNotify">');
                            $(processingTableData[j]).find("td").each(function(idx){
                                newRowData.push($(this).text());
                                if(idx > 0){
                                    processMsg += $(this).text() + ' ';
                                } else {
                                    processMsg += $(this).text() + '<br/>';
                                }
                            });


                            var currentDate = new Date();
                            var datetime = $.datepicker.formatDate('mm/dd/yy', currentDate);
                            var hour = currentDate.getHours();
                            var minute = currentDate.getMinutes();
                            var ampm = ":AM";
                            if (currentDate.getHours() > 12) {
                                hour = parseInt(currentDate.getHours()) - 12;
                                ampm = ":PM";
                            }
                            if(parseInt(hour) < 10){
                                hour = " 0" + hour;
                            }
                            if(parseInt(minute) < 10){
                                minute = " 0" + minute;
                            }
                            datetime += hour + ":" + minute + ":AM";



                            processMsg = '<div id="processMsg'+evalId+'" class="processMsgBox">Finished processing: <br/>' + processMsg + ' evaluation. </div>'
                            newRowData.push(datetime);

                            var newRow = oTableNotifiable.fnAddData(newRowData);
                            var oSettings = oTableNotifiable.fnSettings();
                            var nTr = oSettings.aoData[ newRow[0] ].nTr;
                            $(nTr).addClass( "newAddedRow", function(){
                                if($(".processMsgBox").length > 0){
                                    $(".processMsgBox").slideUp("fast");
                                }
                                $("body").prepend(processMsg);
                                var targetId = "#processMsg"+evalId;
                                $(targetId).slideDown("slow");
                                setTimeout(function() {
                                    $(targetId).slideUp("fast", function(){
                                        $(targetId).remove();
                                    });
                                }, 2000); // Showing message
                            } );


                            updateRegionSelect(oTableNotifiable, $("#regionNotify"));

                            checkAll($("#checkAllNotifiable"),oTableNotifiable);
                        }
                    }
                }
            }
        };


        var interval = null;
        var updateDT = function(){
            if($("#inProgressTable tbody tr td.dataTables_empty").length === 0){
                $.ajax( {
                    type: "GET",
                    url: "/publication/checkProgress",
                    success: function( response ) {
                        updateProcessingTable(response);

                        var rowData = oTableInProgress.fnGetNodes();
                        if(rowData.length === 0){
                            clearInterval(interval); // stop the interval
                        }
                    }
                } );
            }
        };
        interval = setInterval(function() {
            updateDT();
        }, 20000); //check every 20 seconds
        updateDT();

    }
});

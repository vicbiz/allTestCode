$(document).ready(function () {
    var oTable = $("#assetViewTable").dataTable({
        "sPaginationType": "full_numbers",
        "aaSorting": [[1, "asc"]],
        "iDisplayLength": 1000000
        //,
        //"sDom": '<"H"f>rt'
    });

    var oTable2 = $("#assetGroupUserTable").dataTable({
        "sPaginationType": "full_numbers",
        "aaSorting": [[1, "asc"],[2, "asc"]],
        "iDisplayLength": 1000000,
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [0]
            }
        ]
        //,
        //"sDom": '<"H"f>rt'
    });



    var updateFilters = function(fData, fCol){
        if(fData) {
            oTable.fnFilter(fData,fCol);
        } else {
            oTable.fnFilter('',fCol);
            oTable.fnFilter('');
        }
    }
    $("#assetType").on("change", function () {
        updateFilters($("#assetType").val(), 2);
    });
    updateFilters($("#corpDataType").val(), 2);



    var updateChkFilter = function(){
        $("button#standardYear").addClass("disabled");
        var yearData = $("#standardYear").val();
        var archiveData = $("#showArchived").prop("checked");

        if($("#gsrpOnly").prop("checked")){
            $("button#standardYear").removeClass("disabled");
            oTable.fnFilter("^[0-9a-zA-Z]", 0, true, false, true, true); // filtering not empty data
            if(yearData !== ""){
                oTable.fnFilter(yearData, 0);
            }
        } else {
            oTable.fnFilter("", 0);
        }

        if(archiveData){
            oTable.fnFilter("", 3);
        }
        else {
            oTable.fnFilter("false", 3);
        }

    }
    $("#gsrpOnly, #standardYear, #showArchived").on("change", function () {
        updateChkFilter();
    });
    updateChkFilter();



    var updateAllCheckbox = function(){
        var allChkbox = $("#assetGroupUserTable .selsectUserChkBx").length;
        var checkedBx = $("#assetGroupUserTable .selsectUserChkBx:checked").length;
        if(allChkbox === checkedBx){
            $("#assetGroupUserTable #all").prop("checked",true);
        } else {
            $("#assetGroupUserTable #all").prop("checked",false);
        }
    };

    var updateEmaiBtn = function(){
        if($("#assetGroupUserTable .selsectUserChkBx:checked").length > 0){
            $("#sendEmailToUsersBtn").removeClass("disabled");
        } else {
            $("#sendEmailToUsersBtn").removeClass("disabled").addClass("disabled");
        }
    }

    $("#assetGroupUserTable input").on("click", function(){
        updateEmaiBtn();
    });

    $("#assetGroupUserTable #all").on("click", function(){
        if($(this).prop("checked")){
            $("#assetGroupUserTable .selsectUserChkBx").prop("checked",true);
        } else {
            $("#assetGroupUserTable .selsectUserChkBx").prop("checked",false);
        }
        updateEmaiBtn();
    });

    $("#assetGroupUserTable .selsectUserChkBx").on("click", function(){
        updateAllCheckbox();
    });

    updateEmaiBtn();


    $("#sendEmailToUsersBtn").on("click", function(){
        if($("#assetGroupUserTable .selsectUserChkBx:checked").length === 0){ return false;}
        else {
            var $this = $(this);
            var emailList = "mailto:";
            $("#assetGroupUserTable .selsectUserChkBx:checked").each(function(){
                emailList += $(this).attr("data-email")+";";
            });
            location.href = emailList;
        }
    });

    var interval = null;
    var taskId=$(".se-pre-con").attr("data-userid");
    var checkStatus = function(){
        $.ajax( {
            type: "GET",
            url: "/corporateReport/checkAggregationStatus?taskId="+taskId,
            success: function( response ) {
                if(response === "true"){
                    if($(".se-pre-con").is(":visible")){
                        $(".se-pre-con").hide();
                        clearInterval(interval); // stop the interval
                        location.reload();
                    }
                } else {
                    $(".se-pre-con").show();
                }
            }
        } );
    };
    interval = setInterval(function() {
        checkStatus();
    }, 5000); //check every 5 seconds
    checkStatus();

    $(".errorMsg").on("click", function(e){
        if (confirm('Are you sure?')) {
            return true;
        } else {
            return false;
        }
    });

});


$().ready(function () {
    if ($("#compSetSelect").length > 0 || $("#sectionSelect").length > 0) {
        var pathname = window.location.pathname;
        if (pathname.substr(pathname.length - 1) == "/") {
            pathname = pathname.substr(0, pathname.length - 1);
        }

        $("#compSetSelect").on("change", function () {
            var evalId = $(this).attr("data-evalId");
            var selectedVal = $(this).val();
            window.location.href = pathname + "/" + "?compSetId=" + selectedVal;
        });


        var openUrl = function (openType, id) {
            var fulllUrl = window.location.href;
            if (fulllUrl.indexOf(openType) >= 0) {
                var sText = "&"+openType;
                fulllUrl = fulllUrl.substring(0, fulllUrl.indexOf(sText));
            }
            var selectedVal = id;

            if (fulllUrl.indexOf("?") < 0) {
                fulllUrl = fulllUrl + "?" + openType + "=" + selectedVal;
            } else {
                fulllUrl = fulllUrl + "&" + openType + "=" + selectedVal;
            }
            window.location.href = fulllUrl;
        }

        $("#sectionSelect").on("change", function () {
            openUrl("sectionId", $(this).val());
        });

        $("#classificationSelect").on("change", function () {
            openUrl("classificationId", $(this).val());
        });
    }

    if($(".cpClientRankTable").length > 0){
        var oTable = $(".cpClientRankTable").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    //aTargets: [0,1,2,3,4]
                    aTargets: []
                }
            ],
            "aoColumns": [
                null,
                { "sType": "percent" },
                { "sType": "percent" },
                { "sType": "percent" },
                { "sType": "percent" },
                { "sType": "percent" },
                { "sType": "percent" }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000
        });
    }

    if($("#cpTabBlock .tabMenu").length > 0){
        $("#cpTabBlock .tabMenu").on("click", function(e){
            var $this = $(this);
            e.preventDefault();
            if($this.hasClass("selected")){
                return true
            }
            else {
                $("#cpTabBlock .tabMenu").removeClass("selected");
                $this.addClass("selected");

                var targetTbl = "#"+$this.attr("data-tabId");

                //$("#cpTabBlock").parent().find("table").removeClass("hidden").addClass("hidden");
                $("#tabContentWrap > div").removeClass("hidden").addClass("hidden");

                if(targetTbl === '#scoreDetailsEE'){
                    $("#scoreDetailsEE table.dataTable").removeClass("hidden");
                    $('#scoreDetailsEE').removeClass("hidden");
                } else {
                    $(targetTbl).removeClass("hidden");
                }
            }
        });
    }

    var slideUpDown = function(sdStatus){
        if(sdStatus == "close"){
            $("#cpSlideListDiv").slideUp(function(){
                $("#cpSlideHeader").removeClass("bdrBottom");
                $("#cpListOpenCloseTxt").text("Open List");
                $("#cpListOpenClose").text("+");
            });
        };
        if(sdStatus == "open"){
            $("#cpSlideHeader").addClass("bdrBottom");
            $("#cpSlideListDiv").slideDown(function(){
                $("#cpListOpenCloseTxt").text("Close List");
                $("#cpListOpenClose").text("-");
            });
        };
    }

    if($("#cpListOpenCloseWrap").length > 0){
        $("#cpListOpenCloseWrap").unbind('click').bind('click', function(event) {
            if($("#cpSlideListDiv").is(':visible')){
                slideUpDown("close");
            } else {
                slideUpDown("open");
            }
        });

        if($("#cpListOpenCloseWrap").hasClass("initClose")){
            slideUpDown("close");
        };
        if($("#cpListOpenCloseWrap").hasClass("initOpen")){
            slideUpDown("open");
        };
    }

});

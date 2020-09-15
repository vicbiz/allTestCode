$().ready(function () {
    $(".dataTable").each(function () {
        var targetId = "#" + $(this).attr("id");
        if($(this).attr("data-assettype") === "Hotel"){
            var oTable = $(targetId).dataTable({
                "sPaginationType": "full_numbers",
                "aoColumnDefs": [
                    {
                        bSortable: false,
                        aTargets: [0]
                    }
                ],
                "aoColumns": [
                    null,
                    {"sType": "numeric-comma"},
                    {"sType": "numeric-comma"},
                    {"sType": "numeric-comma"},
                    {"sType": "percent"},
                    {"sType": "percent"}
                ],
                "aaSorting": [],
                "sDom": '<"H"f>rt',
                "bFilter": false,
                "bInfo": false,
                "iDisplayLength": 100000
            });
        } else {
            var oTable = $(targetId).dataTable({
                "sPaginationType": "full_numbers",
                "aoColumnDefs": [
                    {
                        bSortable: false,
                        aTargets: [0]
                    }
                ],
                "aoColumns": [
                    null,
                    {"sType": "numeric-comma"},
                    {"sType": "numeric-comma"},
                    {"sType": "numeric-comma"},
                    {"sType": "numeric-comma"},
                    {"sType": "percent"},
                    {"sType": "percent"}
                ],
                "aaSorting": [],
                "sDom": '<"H"f>rt',
                "bFilter": false,
                "bInfo": false,
                "iDisplayLength": 100000
            });
        }

    });

    if($(".eeQuestion").length > 0){
        $(".eeQuestion").css("display","none").removeClass("hidden");

        var updateEEQ = function(that){
            if($(that).is(':checked')){
                $(".eeScore .eeQuestion").slideDown();
                $(".eeText span").removeClass("fui-triangle-down-small").removeClass("fui-triangle-up-small").addClass(("fui-triangle-up-small"));
            } else {
                $(".eeScore .eeQuestion").slideUp();
                $(".eeText span").removeClass("fui-triangle-down-small").removeClass("fui-triangle-up-small").addClass(("fui-triangle-down-small"));
            }
        }
        $("#showQuestions").on("change", function(){
            updateEEQ($(this));
        });
        updateEEQ($("#showQuestions"));


        $(".eeScore").on("click", function(){
            var $qTriangel = $(this).find(".eeText span");
            if( $qTriangel.hasClass("fui-triangle-down-small") ){ $qTriangel.removeClass("fui-triangle-down-small").addClass("fui-triangle-up-small"); }
            else if( $qTriangel.hasClass("fui-triangle-up-small") ){ $qTriangel.removeClass("fui-triangle-up-small").addClass("fui-triangle-down-small"); }
            $(this).find(".eeQuestion").slideToggle("fast");
        });

        //$('[data-toggle="tooltip"]').tooltip({});
    }
});
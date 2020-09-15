$(document).ready(function() {
    if($("#showEmbargo").length > 0 && $("#hEmbargo").length === 0){
        //e.preventDefault();
        var modalId = "myModal";
        var modalTitle = "Important Message";
        var modalContent = $("#showEmbargo").html();
        var noTxt = "";
        var yesTxt = "CLOSE";
        //e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){});
    }

    if($(".helpTextPopup").length > 0){
        $(".helpTextPopup").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Help";
            var modalContent = $($(this).attr("data-helpContent")).html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });
    }

    if($(".iframe").length > 0) {
        $(".iframe").colorbox({iframe: true, width: "700px;", height: "700px"});
    }
});

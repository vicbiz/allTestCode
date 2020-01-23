$(document).ready(function () {
    if($(".message").length > 0){
        var modalId = "myModal";
        var modalTitle = $(".message .msgTitle").html();
        var modalContent = $(".message").html();
        var noTxt = "";
        var yesTxt = "";
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){});
    }
});

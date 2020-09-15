$(document).ready(function () {
    if($(".helpIcon").length > 0){
        $(".helpIcon:not(.disabled)").click(function(e) {
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


    $("#deleteAssetGroup a").on("click", function(ev){
        ev.preventDefault();
        var $this = $(this);
        var $link = $this.attr("href");
        console.log("href :"+$link);
        var modalId = "myModal";
        var modalTitle = "Are you sure?";
        var modalContent = "Deleting the Asset Group will make reports for this Asset Group unaccessible. If the group is used for Competitive Analysis (Brand Competitors), the data will not appear in that report. Are you sure you want to delete this group?";
        var noTxt = "CANCEL";
        var yesTxt = "YES";
        ev.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            if (result === false) {
                return false;
            } else {
                window.location.href = $link;
            }
        });
    });

});


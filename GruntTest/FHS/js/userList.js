$(document).ready(function () {
    var oTable = $("#userList").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumns": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {"bSortable": false}
        ],
        "iDisplayLength": 100,
        "aaSorting": [
            [1, "asc"]
        ]
    });

    if($(".message").length > 0){
        var modalId = "myModal";
        var modalTitle = $(".message .msgTitle").html();
        var modalContent = $(".message").html();
        var noTxt = "";
        var yesTxt = "";
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){});
    }
});

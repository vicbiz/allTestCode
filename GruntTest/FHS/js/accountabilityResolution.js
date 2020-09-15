$(document).ready(function () {
    var displaySize = $("#accountabilityDetailsTable").attr("data-displaySize");

    var oTable = $("#accountabilityDetailsTable").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "iDisplayLength": displaySize,
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [0,2]
            }
        ],
        "aaSorting": [
            [1, "asc"]
        ],
        "aoColumns": [
            { "sWidth": "15%" },
            { "sWidth": "10%" },
            { "sWidth": "75%" },
        ]
    });

    $("#resolveBtn").click(function(e) {
        e.preventDefault();
        var modalId = "myModal";
        var modalTitle = "Resolve Assignment";
        var modalContent = $($(this).attr("data-modaldiv")).html();
        var noTxt = "";
        var yesTxt = "Cancel";
        e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
        });
    });

});

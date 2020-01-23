$(document).ready(function () {
    var displaySize = $("#accountabilityDetailsTable").attr("data-displaySize");
    var oTable1 = $("#accountabilityDetailsTable").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "iDisplayLength": displaySize,
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [2]
            }
        ],
        "aaSorting": [
            [0, "asc"],
            [1, "asc"]
        ],
        "aoColumns": [
            { "sWidth": "15%", "sType": "display-date" },
            { "sWidth": "10%" },
            { "sWidth": "75%" },
        ]
    });

    displaySize = $("#accountabilityHistoryTable").attr("data-displaySize");
    var oTable2 = $("#accountabilityHistoryTable").dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "iDisplayLength": displaySize,
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: []
            }
        ],
        "aoColumns": [
            { "sWidth": "10%" },
            { "sWidth": "20%" },
            { "sWidth": "10%" },
            { "sWidth": "20%" },
            { "sWidth": "40%" },
        ]
    });

    $("#assignBtn, #assignLink").click(function(e) {
        e.preventDefault();
        var modalId = "assignPopupModal";
        var modalTitle = "Please enter email address of the assigned person";
        if($("input.assignEmailInput").val() !==""){
            modalTitle = "Please enter email address of the assigned person";
        }

        var modalContent = $($(this).attr("data-modaldiv")).html();
        var noTxt = "";
        var yesTxt = "CLOSE";
        e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
        });
    });


    // email Validation
    $(document).on('change keyup mouseenter blur','#assignPopupModal form #email',function(){
        if(this.value!=this.defaultValue){
            var enteredEmail = $("#assignPopupModal form #email").val();
            if($.IsEmail(enteredEmail)){
                $('#assignPopupModal form #submitBtn').removeClass("disabled");
            } else {
                $('#assignPopupModal form #submitBtn').removeClass("disabled").addClass("disabled");
            }
        }
    });


});

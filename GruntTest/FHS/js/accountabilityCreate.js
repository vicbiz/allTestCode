$().ready(function () {

    //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    $("#selectSection select").on("change", function () {
        var selectedValue = $("option:selected").attr("value");
        var evalId = $(this).attr("data-evalid");
        var newUrl = "/accountability/accountabilityCreate/" + evalId + "?sectionId=" + selectedValue;
        window.location = newUrl;
    });


    /// Custom Datatable Filter ************************************************
    var oTable = $("#assignmentTable").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            {
                bSortable: false,
                aTargets: [-1, 3, 4]
            }
        ],
        "aaSorting": [],
        "sDom": '<"H"f>rt',
        "bFilter": true,
        "bInfo": false,
        "iDisplayLength": 100000,
        "aoColumns": [
            { "sWidth": "0%" }, // 0st column width
            { "sWidth": "10%" }, // 1st column width
            { "sWidth": "15%" }, // 1st column width
            { "sWidth": "30%" }, // 2nd column width
            { "sWidth": "30%" }, // 4th column width
            { "sWidth": "5%" }, // 4th column width
            { "sWidth": "10%" } // 4th column width
        ]
    });

    // Using Input Field for Filtering
    $("#testFilter").keyup(function () {
        /* Filter on the column (the index) of this element */
        //console.log("this.value :" + this.value);
        oTable.fnFilter(this.value, 1);
    });


    // Using Checkbox for Filtering
    $(".tableFilter").on("change", function () {
        var filterS = $("#filterService").is(':checked');
        var filterF = $("#filterFacility").is(':checked');

        if (!filterS && !filterF) {
            oTable.fnFilter("SF", 0);
        } else {
            if (filterS && filterF) {
                oTable.fnFilter("", 0);
            } else {
                if (filterS) {
                    oTable.fnFilter("S", 0);
                } else {
                    oTable.fnFilter("F", 0);
                }
            }
        }
    });


    // Using Checkbox for Filtering
    var updateClassificationDropdown = function($this){
        var selectedText = $this.find(":selected").text();
        if (selectedText === "All") {
            oTable.fnFilter("", 2);
        } else {
            oTable.fnFilter(selectedText, 2);
        }
    };
    $("#selectClassification select").on("change", function () {
        updateClassificationDropdown($(this));
    });
    updateClassificationDropdown($("#selectClassification select"));
    /// Custom Datatable Filter END ************************************************




    var openPopModal = function($this){
        var $modalContentObj = $($this.attr("data-modaldiv"));
        var assignedEmail = $modalContentObj.find("#email").val();
        var modalId = "assignPopupModal";
        var modalTitle = "Please enter email address of the assigned person";
        if(assignedEmail !==""){
            modalTitle = "Please enter email address of the assigned person";
        }
        var modalContent = $modalContentObj.html();
        var noTxt = "";
        var yesTxt = "Cancel";
        //e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
        });
    };

    // for already Assigned -- OPEN link
    $("#CreateAssignmentsPage .assignedOpenLink").on("click", function(e) {
        e.preventDefault();
        var $this = $(this);
        var $modalContentObj = $($this.attr("data-modaldiv"));
        var assignData = $(this).attr("data-answerId");
        var assignedEmail = $(this).attr("data-assigned");
        var classificationId = $("#selectClassification select").val();
        $modalContentObj.find("#responseIds").val(assignData);
        $modalContentObj.find("#email").attr("value",assignedEmail);
        $modalContentObj.find("#classificationId").attr("value",classificationId);

        openPopModal($this);
    });

    // for not assigned using Checkbox -- ASSIGN Btn link
    $("#CreateAssignmentsPage #assignBtn").on("click", function(e) {
        e.preventDefault();
        var $this = $(this);
        var $modalContentObj = $($this.attr("data-modaldiv"));
        var classificationId = $("#selectClassification select").val();
        var checkBoxCount = $("#assignmentTable input.assignCheckBox:checked").length;
        if(checkBoxCount > 0){
            var assignData = "";
            $("#CreateAssignmentsPage #assignmentTable input.assignCheckBox:checked").each(function(index){
                assignData += $(this).attr("data-answerid");
                if(index < checkBoxCount-1){
                    assignData += ",";
                }
            });
            $modalContentObj.find("#responseIds").val(assignData);
            $modalContentObj.find("#email").attr("value","");
            $modalContentObj.find("#classificationId").attr("value",classificationId);
            openPopModal($this);
        }
    });




    var unlockAssignBtn = function(){
        var checkBoxCount = $("#CreateAssignmentsPage #assignmentTable .assignCheckBox:checked").length;
        var $assignBtn = $("#CreateAssignmentsPage #assignBtn");
        if(checkBoxCount > 0){
            $assignBtn.removeClass("disabled");
        } else {
            $assignBtn.removeClass("disabled").addClass("disabled");
        }
    };

    $("#CreateAssignmentsPage #assignmentTable .assignCheckBox").on("click", function(){
        unlockAssignBtn();
    });

    unlockAssignBtn();

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

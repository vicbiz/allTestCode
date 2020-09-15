$().ready(function () {

    //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    $("#selectYear select").on("change", function () {
        var selectedValue = $(this).find("option:selected").attr("value");
        var newUrl = window.location.pathname + "?id=${evaluation.id}&year=" + selectedValue;
        window.location = newUrl;
    });


    /// Custom Datatable Filter ************************************************
    var oTable = $("#assignmentTableOpen").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            {
                bSortable: false,
                aTargets: [4, 7, 8]
            }
        ],
        "aaSorting": [
            [9, 'desc']
        ],
        "sDom": '<"H"f>rt',
        "bFilter": true,
        "bInfo": false,
        "iDisplayLength": 100000,
        "bAutoWidth": false ,
        "aoColumns": [
            { "sWidth": "0%" },
            { "sWidth": "10%" },
            { "sWidth": "15%" },
            { "sWidth": "10%" },
            { "sWidth": "35%" },
            { "sWidth": "10%" },
            { "sWidth": "10%", "iDataSort": 9 },
            { "sWidth": "5%" },
            { "sWidth": "5%" },
            { "sWidth": "0%" }
        ]
    });

    var oTable2 = $("#assignmentTableResolved").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            {
                bSortable: false,
                aTargets: [4, 5, 7]
            }
        ],
        "aaSorting": [
            [6, 'desc']
        ],
        "sDom": '<"H"f>rt',
        "bFilter": true,
        "bInfo": false,
        "iDisplayLength": 100000,
        "bAutoWidth": false ,
        "aoColumns": [
            { "sWidth": "0%" },
            { "sWidth": "10%" },
            { "sWidth": "15%" },
            { "sWidth": "10%" },
            { "sWidth": "25%" },
            { "sWidth": "30%" },
            { "sWidth": "5%", "iDataSort": 8},
            { "sWidth": "5%" },
            { "sWidth": "0%" }
        ]
    });

    // Using Input Field for Filtering
    $("#testFilter").keyup(function () {
        /* Filter on the column (the index) of this element */
        //console.log("this.value :" + this.value);
        oTable.fnFilter(this.value, 1);
    });

    // Using Radio Button for Filtering
    var toggleTab = function(selectedVal){
        if(selectedVal === 'Open'){
            $("#assignmentTableOpenWrap").show();
            $("#assignmentTableResolvedWrap").hide();
        } else {
            $("#assignmentTableOpenWrap").hide();
            $("#assignmentTableResolvedWrap").show();
        }
    }

    $(".tableFilterRadio").on("change", function () {
        var selectedVal = $(this).attr("value");
        toggleTab(selectedVal);
    });
    toggleTab($(".tableFilterRadio:radio[checked]").val());




    var urlParamSuccess = $.urlParam('success');
    if(urlParamSuccess === ""){
        $(".successUpdating").remove();
    }

    /// Custom Datatable Filter END ************************************************



    $(".resolveLink").click(function(e) {
        e.preventDefault();
        var modalId = "myModal";
        var modalTitle = "Resolve Assignment";
        var id = $(this).attr("data-id");
        $("#resolveModal #id").val(id);
        $("#resolveModal #filterByAssetId").val($("#assetId").val());
        var modalContent = $("#resolveModal").html();
        var noTxt = "";
        var yesTxt = "Cancel";
        e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
        });
    });

    var updatePropertyFilter = function(propId){
        if(propId !== ""){
            oTable.fnFilter("^"+propId+"$", 0 , true, false); // Exact Match filter
            oTable2.fnFilter("^"+propId+"$", 0 , true);
        } else {
            oTable.fnFilter(propId, 0);
            oTable2.fnFilter(propId, 0);
        }
    };
    $("#assetId").on("change", function(){
        updatePropertyFilter($(this).val());
    });
    updatePropertyFilter($("#assetId").val());



});

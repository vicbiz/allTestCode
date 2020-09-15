$(document).ready(function() {
    //$("#assetTypeId").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    $("#selectedAssetId").select2({
        placeholder: "Select an Asset",
        width: 300,
        allowClear: true
    });

    $("#assetToMergeId").select2({
        placeholder: "Select an Asset to merge",
        width: 300,
        allowClear: true
    });

    if($(".assetIntegrationMsg").length > 0){
        setTimeout(function() {
            $(".assetIntegrationMsg").fadeOut('slow');
        }, 3000);
    }

    var evaluationTable = $("#evaluations");
    if(evaluationTable) {
        evaluationTable.dataTable({
            "sPaginationType": "full_numbers"
        });
    }

    var userTable = $("#users");
    if(userTable) {
        userTable.dataTable({
            "sPaginationType": "full_numbers"
        });
    }

    var ratingTable = $("#ratings");
    if(ratingTable) {
        ratingTable.dataTable({
            "sPaginationType": "full_numbers"
        });
    }

    var siblingTable = $("#siblings");
    if(siblingTable) {
        siblingTable.dataTable({
            "sPaginationType": "full_numbers"
        });
    }
});

$(document).ready(function() {
    //$("#assetTypeId").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    $("#fhsAssetId").select2({
        placeholder: "Select a FHS Asset",
        width: 300,
        allowClear: true
    });

    $("#ftgPropertyId").select2({
        placeholder: "Select a FTG Property",
        width: 300,
        allowClear: true
    });

    if($(".assetIntegrationMsg").length > 0){
        setTimeout(function() {
            $(".assetIntegrationMsg").fadeOut('slow');
        }, 3000);
    }
});

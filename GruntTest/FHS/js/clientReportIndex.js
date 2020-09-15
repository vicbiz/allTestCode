$().ready(function(){
    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    $("select#year").on("change", function(){
        var selectedValue = $("option:selected").attr("value");
        var newUrl = window.location.pathname+"?year="+selectedValue;
        window.location = newUrl;
    });


    /// Custom Datatable Filter ************************************************
    var oTable = $("#evalTable").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            {
                bSortable: false,
                aTargets: [-1,2]
            }
        ],
        "aaSorting": [],
        "sDom": '<"H"f>rt',
        "bFilter": true,
        "bInfo": false,
        "iDisplayLength": 1000000,
        "aoColumns": [
            { "sWidth": "0%", "bVisible": false },
            { "sWidth": "30%"},
            { "sWidth": "10%" },
            { "sWidth": "10%", "sType": "percent" },
            { "sWidth": "10%", "sType": "percent" },
            { "sWidth": "10%", "sType": "percent" },
            { "sWidth": "10%" }
        ]
    });

    var selectedVal = $('select#asset').val();
    var defaultFilter = "^"+selectedVal+"$";
    $('#asset').val(selectedVal);
    oTable.fnFilter(defaultFilter,0,true);
    $(".selectAsset").on("change", function(){
        var filterVal = "^"+$(this).val()+"$";
        oTable.fnFilter( filterVal, 0 ,true );
        updatePropName();
    });


    var updatePropName = function(){
        var propName = $("#asset").find("option:selected").text();
        $("#allReportPropName").html(propName);
    };
    updatePropName();


});


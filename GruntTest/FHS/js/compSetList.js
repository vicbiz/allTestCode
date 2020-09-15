$(document).ready(function () {
    //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var sortCol = 1;
    if($(".fhsSelect.cpBrand").length > 0){
        sortCol = 0;
    }

    if($("#cpBrandList").length > 0){
        var oTable = $("#cpBrandList").dataTable({
            "sPaginationType": "full_numbers",
            "iDisplayLength": 100000,
            //"sDom": '<"H"f>rt',
            "iDisplayLength": 100,
            "aaSorting": [
                [sortCol, "asc"]
            ],
            "bAutoWidth": false,
            aoColumnDefs: [
                { "sWidth": "200", "aTargets": [ -1 ] },
                {
                    bSortable: false,
                    aTargets: [-1]
                }
            ]
        });
    }
    if($("#cpList").length > 0){
        var oTable = $("#cpList").dataTable({
            "sPaginationType": "full_numbers",
            "iDisplayLength": 100000,
            //"sDom": '<"H"f>rt',
            "iDisplayLength": 100,
            "aaSorting": [
                [sortCol, "asc"]
            ],
            "bAutoWidth": false,
            aoColumnDefs: [
                { "sWidth": "200", "aTargets": [ -1 ] },
                {
                    bSortable: false,
                    aTargets: [-1]
                }
            ]
        });
    }

    $("#yearId").on("change", function () {
        var selectedVal = $(this).val();
        var filters = "";
        $("#cpStatus .chkFilter").each(function () {
            if ($(this).prop('checked')) {
                filters += $(this).attr("data-val") + "|";
            }
        });
        if($(this).hasClass("cpBrand")){
            window.location.href = window.location.pathname+"?yearId=" + selectedVal;
        } else {
            window.location.href = window.location.pathname+"?yearId=" + selectedVal + "&filters=" + filters;
        }
    });

    var updateTableFilter = function () {
        var filters = "";
        $("#cpStatus .chkFilter").each(function () {
            if ($(this).prop('checked')) {
                filters += $(this).attr("data-val") + "|";
            }
        });
        filters = filters.substring(0, filters.length - 1);
        if (filters === "") {
            filters = "NOSelection";
        }
        oTable.fnFilter(filters, 6, true, false, true, true); // multi value filter using OR condition
    }
    $(".chkFilter").on("click", function () {
        updateTableFilter();
    });
    updateTableFilter();



    var urlParamFilters = $.urlParam('filters');
    if(urlParamFilters){
        $("#cpStatus input").removeAttr("checked");
        if(urlParamFilters.indexOf("SUBMITTED") >= 0){
            $("#cpStatus input[data-val='SUBMITTED']").attr("checked","checked");
        }
        if(urlParamFilters.indexOf("APPROVED") >= 0){
            $("#cpStatus input[data-val='APPROVED']").attr("checked","checked");
        }
        if(urlParamFilters.indexOf("INCOMPLETE") >= 0){
            $("#cpStatus input[data-val='NEW|SAVED|INCOMPLETE']").attr("checked","checked");
        }
        updateTableFilter();
    }



});

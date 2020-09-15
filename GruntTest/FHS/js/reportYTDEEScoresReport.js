$(document).ready(function() {
    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var oTable = $("#data").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            {
                aTargets: [-1]
            }
        ],
        "aaSorting": []
    });

    $( "#startDate, #endDate" ).datepicker();
    $(".selectDateWrap button.calIcon").on("click", function(){
        var targetObj = $(this).attr("data-targetInput");
        $(targetObj).datepicker("show");
    });

    $("#evaluationType").on("change", function(){
        var selectedVal = $(this).val();
        if(selectedVal === "BRAND"){
            //oTable.fnFilter('',2);
            //oTable.fnFilter(selectedVal, 1);
            oTable.fnFilter('^(?!FTG).+', 2, true, false);
        } else {
            //oTable.fnFilter('',1);
            oTable.fnFilter(selectedVal, 2);
        }
    });




    var i, aoColumns = [], tdCt = $("#sectionsTable thead tr:nth-child(1) td").length;
    for (i = 0; i < tdCt; i++) {
        if(i === 0){
            aoColumns.push( null );
        } else {
            aoColumns.push( { 'sType': 'percent' } );
        }
    }

    var oTable1 = $("#sectionsTable").dataTable({
        "sPaginationType": "full_numbers",
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: []
            }
        ],
        "aoColumns": aoColumns,
        "aaSorting": [[0, "asc"]],
        "sDom": '<"H"f>rt',
        "iDisplayLength": 100000
    });

    var updateTables = function(){
        if($("#showOnlyClientFacing").attr('checked')){
            $("#overallTable td.notClientFacing, #sectionsTable td.notClientFacing").hide();
        } else {
            $("#overallTable td.notClientFacing, #sectionsTable td.notClientFacing").show();
        }
    }
    $("#showOnlyClientFacing").on("change", function(){
        updateTables();
    });
    updateTables();


});
